import {selectAll, select, PowerDom as PD} from "./PowerDom"

function loopHelper(item, index, tpl) {
    return eval('`' + tpl + '`')
}

class Template {
    static replace(element){
        const template = select('template', element)
        const content = template.content

        PD.$(element).replace(content.childNodes)
    }

    static async process(element, module) {
        const template = select('template', element)
        const content = template.content

        module.loopHelper = loopHelper

        return Template._loop(module, content).then(() => {
                Template._elements(content, module)

                Template._listen(module, content)

                PD.$(element).replace(content.childNodes)
            }
        )
    }

    static async _loop(module, content) {
        const promises = []

        selectAll('[pd-loop]', content).forEach(el => {
            if (!el.hasAttribute('items')) {
                PD.$(el).remove()
            } else {
                promises.push(Template.loopHelper(el, module))
            }
        })

        await Promise.all(promises)
    }

    static async loopHelper(el, module) {
        const dataAttr = el.getAttribute('items')
        let items = (typeof module[dataAttr] === 'function') ? module[dataAttr]() : module[dataAttr]
        let html = ''
        let tpl = ''

        if(items instanceof Promise) {
            await items.then(result => items = result)
        }

        el.removeAttribute('items')
        el.removeAttribute('pd-loop')

        tpl = el.outerHTML.trim()

        if (!Array.isArray(items)) {
            throw 'Items is not an array'
        }

        items.forEach((item, index) => html += module.loopHelper(item, index, tpl))

        PD.$(el).replace(html)
    }

    /**
     * Finds all the elements with _ as attribute and attach them to the current
     * instance
     */
    static _elements(content, module) {
        module._ = {}

        selectAll('[_]', content).forEach(el => module._[el.getAttribute('_')] = PD.$(el))
    }

    /**
     * Finds all the elements with _listen="event1:callback1,event2:callback2" as attribute
     * and adds listener to those element where the callback is this.callback, this.callback2 ...
     */
    static _listen(module, content) {
        selectAll('[_listen]', content).forEach(el => {
            const strListeners = el.getAttribute('_listen')

            if (strListeners.length > 0) {
                strListeners.split(",").forEach(strListener => Template._listenHelper(strListener, el, module))
            }

            el.removeAttribute('_listen')
        })
    }

    static _listenHelper(strListener, el, instance) {
        const [event, callback] = strListener.split(':')

        PD.$(el).listen(event, instance[callback])
    }
}

export default Template