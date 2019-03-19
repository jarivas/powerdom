const helper = {
    templates: new Map(),
    modules: new Map(),
    getTargetElement: function (targetElementSelector) {
        const selectorType = typeof targetElementSelector
        let targetElement = ''

        if (selectorType == 'undefined')
            targetElement = PD('body')
        else if (selectorType == 'string')
            selectorType = PD(targetElementSelector)
        else if ((selectorType == 'object') && (targetElementSelector instanceof app.PowerDom))
            targetElement = targetElementSelector
        else
            throw 'Invalid selector'

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

        code = await app.Request.getRemoteText(url)
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

    static async importTemplate(url, targetElementSelector) {
        const templates = helper.templates
        let targetElement = helper.getTargetElement(targetElementSelector)
        let template = null, html = '', js = ''

        if (templates.has(url)) {
            html = templates.get(url)
        } else {
            html = await app.Request.getRemoteText(url)
            templates.set(url, html)
        }

        targetElement.empty()
        template = app.PD(document.createElement("template")).setContent(html)

        template.selectAll('script', template).forEach(script => {
            js += script.textContent
            script.remove()
        })

        eval(js)

        targetElement.setContent(template.getElements().childNodes)
        template.remove()
    }

    static async importModule(url) {
        const modules = helper.modules

        if (!modules.has(url)) {
            eval(await helper.getCode(url))
        }

        return modules.get(url)
    }

    static async loadJSON(url) {
        return JSON.parse(await app.Request.getRemoteText(url))
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
            const code = await app.Request.getRemoteText(url)

            eval(helper.appendJsToHead(url, code))
        }
    }
}

export default Importer