import {selectAll, select, PowerDom as PD} from "./PowerDom"

function evalHelper(item, index, tpl) {
    return eval('`' + tpl + '`')
}

class Template {
    static setContent(element, replace) {
        const template = select('template', element)
        const content = template.content

        if (typeof replace === 'undefined') {
            PD.$(element).setContent(content.children)
        } else {
            PD.$(element).replace(content.children)
        }
    }

    static async process(element, module, replace) {
        const template = select('template', element)
        const content = template.content

        module.evalHelper = evalHelper

        return Template._loop(module, content).then(() => {
            Template._if(module, content).then(() => {
                Template._elements(content, module)

                Template._listen(module, content)

                if (typeof replace === 'undefined') {
                    PD.$(element).setContent(content.children)
                } else {
                    PD.$(element).replace(content.children)
                }

                if (typeof module.process !== 'undefined') {
                    module.process()
                }
            })
        })
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

        if (dataAttr == null) {
            return
        }

        let items = (typeof module[dataAttr] === 'function') ? module[dataAttr]() : module[dataAttr]

        el.removeAttribute('items')
        el.removeAttribute('pd-loop')

        if (items instanceof Promise) {
            return items.then(result => this.loopFinalHelper(el, result, dataAttr, module))
        }

        this.loopFinalHelper(el, items, dataAttr, module)
    }

    static loopFinalHelper(el, items, dataAttr, module) {
        const tpl = el.outerHTML.trim()
        let html = ''

        if (!Array.isArray(items)) {
            throw `Items ${dataAttr} is not an array`
        }

        if(tpl.includes('${')) {
            items.forEach((item, index) => html += module.evalHelper(item, index, tpl))
        } else {
            items.forEach(item => html += item)
        }


        PD.$(el).replace(html)
    }

    static async _if(module, content) {
        const promises = []

        selectAll('[pd-if]', content).forEach(el => {
            if (!el.hasAttribute('condition')) {
                PD.$(el).remove()
            } else {
                promises.push(Template._ifHelper(el))
            }
        })

        await Promise.all(promises)
    }

    static async _ifHelper(el) {
        const condition = el.getAttribute('condition')

        el.removeAttribute('condition')
        el.removeAttribute('pd-if')

        if (condition === 'undefined' || condition === 'null' || !new Boolean(condition)) {
            PD.$(el).remove()
        }
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

        PD.$(el).listen(event, instance[callback].bind(instance))
    }
}

export default Template