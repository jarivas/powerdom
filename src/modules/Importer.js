import {PowerDom} from './PowerDom.js'
import Request from './Request.js'

const $ = PowerDom.getInstance

const helper = {
    templates: new Map(),
    modules: new Map(),
    getTargetElement: function (targetElementSelector) {
        const selectorType = typeof targetElementSelector
        let targetElement = null

        if (selectorType == 'undefined') {
            targetElement = $(document.body)
        } else if (selectorType == 'string') {
            targetElement = $(targetElementSelector)
        } else if (selectorType == 'object') {
            if (targetElementSelector instanceof PowerDom)
                targetElement = targetElementSelector
            else if (targetElementSelector instanceof Node)
                targetElement = $(targetElementSelector)
        } else {
            throw 'Invalid selector'
        }

        return targetElement
    },
    appendJsToHead: function (url, code) {
        const temp = url.split('/')

        return `${code} //# sourceURL=${temp.pop()}`
    },
    getCode: async function (url) {
        const removeComments = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
        const exportDefault = /export\s+default\s+(\w*)/
        const multiExport = /export\s*\{(.+)\}/
        const splitMultiExport = /\w+/g
        let lineToReplace = '', replacingLine = '', code = ''

        code = await Request.getRemoteText(url)
        code = code.replace(removeComments, '')

        if (exportDefault.test(code)) {
            const matches = code.match(exportDefault)
            lineToReplace = matches[0]
            replacingLine = `modules.set('${url}', ${matches[1]})\n`

        } else if (multiExport.test(code)) {
            const matches = code.match(multiExport)

            lineToReplace = matches[0]
            replacingLine = 'const m = {}\n'

            matches[1].match(splitMultiExport).forEach(exported => {
                replacingLine += `m.${exported} = ${exported}\n`
            })

            replacingLine += `modules.set('${url}', m)\n`
        } else {
            throw `Not a valid url: ${url}`
        }

        code = code.replace(lineToReplace, replacingLine)

        return helper.appendJsToHead(url, code)
    }
}

window.modules = helper.modules

/**
 * Provides methods to imports the templates, modules and JSON
 */
class Importer {

    /**
     * Reads asynchronously the html file and converts it to nodes
     * @param {string} url to the file
     * @param {string, Node, PowerDom} [targetElementSelector] if not selector provided, it will use body
     * @param {boolean} [replaceTargetElement] in case you want to remove the wrapper element
     */
    static async importTemplate(url, targetElementSelector, replaceTargetElement) {
        const templates = helper.templates
        const template = document.createElement('template')
        let targetElement = helper.getTargetElement(targetElementSelector)
        let html = ''

        if (templates.has(url)) {
            html = templates.get(url)
        } else {
            html = await Request.getRemoteText(url)
            templates.set(url, html)
        }

        template.insertAdjacentHTML('beforeend', html)

        if (typeof replaceTargetElement == 'undefined' || !replaceTargetElement)
            targetElement.setContent(template.childNodes)
        else
            targetElement.replace(template.childNodes)

        template.remove()
    }

    /**
     * Imports the module dinamacally because normal imports can not be used
     * @param {string} url
     * @returns {Object}
     */
    static async importModule(url) {
        const modules = helper.modules

        if (!modules.has(url)) {
            window.eval(await helper.getCode(url))
        }

        return modules.get(url)
    }

    /**
     * Reads a json and return the object that represents it
     * @param {string} url 
     * @returns {Object}
     */
    static async loadJSON(url) {
        return JSON.parse(await Request.getRemoteText(url))
    }
}

export default Importer