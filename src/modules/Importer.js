import {PowerDom, selectAll} from './PowerDom.js'
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

class Importer {

    static async importTemplate(url, targetElementSelector, replaceTargetElement) {
        const templates = helper.templates
        const template = document.createElement('template')
        let targetElement = helper.getTargetElement(targetElementSelector)
        let html = '', js = ''

        if (templates.has(url)) {
            html = templates.get(url)
        } else {
            html = await Request.getRemoteText(url)
            templates.set(url, html)
        }

        template.insertAdjacentHTML('beforeend', html)
        selectAll('script', template).forEach(script => {
            js += script.textContent
            script.remove()
        })

        if (typeof replaceTargetElement == 'undefined' || !replaceTargetElement)
            targetElement.setContent(template.childNodes)
        else
            targetElement.replace(template.childNodes)

        template.remove()

        window.eval(js)
    }

    static async importModule(url) {
        const modules = helper.modules

        if (!modules.has(url)) {
            window.eval(await helper.getCode(url))
        }

        return modules.get(url)
    }

    static async loadJSON(url) {
        return JSON.parse(await Request.getRemoteText(url))
    }

    static loadCss(url) {
        const head = document.head
        const css = document.createElement('link')
        let cssAdded = false

        css.href = url
        css.type = 'text/css'
        css.rel = 'stylesheet'

        css.onload = css.onreadystatechange = function () {
            if (!cssAdded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                cssAdded = true
                css.onload = css.onreadystatechange = null
            }
        }

        head.appendChild(css)
    }

    static async loadMultipleJs(files) {
        for (let i = 0; i < files.length; ++i) {
            const url = files[i]
            const code = await Request.getRemoteText(url)

            window.eval(helper.appendJsToHead(url, code))
        }
    }
}

export default Importer