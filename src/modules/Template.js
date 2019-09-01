import {selectAll, select, PowerDom as PD} from "./PowerDom"

function loopHelper(item, index, tpl) {
    return eval('`' + tpl + '`')
}

class Template {
    static process(element) {
        const template = select('template', element)
        const content = template.content

        Template.loop(element, content).then(() => {
                Template._elements(content)

                Template._listen(element, content)

                PD.$(element).replace(content.childNodes)

                if (element.dataset.hasOwnProperty('ready')) {
                    this[element.dataset.ready]()
                }
            }
        )
    }

    static async loop(element, content) {
        selectAll('[pd-loop]', content).forEach(el => {
            if (!el.hasAttribute('items')) {
                PD.$(el).remove()
            } else {
                const dataAttr = el.getAttribute('items')
                let items = (typeof element[dataAttr] === 'function') ? element[dataAttr]() : element[dataAttr]
                let html = ''
                let tpl = ''

                el.removeAttribute('items')
                el.removeAttribute('pd-loop')

                tpl = el.outerHTML.trim()

                if (!Array.isArray(items)) {
                    throw 'Items is not an array'
                }

                items.forEach((item, index) => html += loopHelper(item, index, tpl))
                PD.$(el).replace(html)
            }
        })
    }

    /**
     * Finds all the elements with _ as attribute and attach them to the current
     * instance
     */
    static _elements(content) {
        content._ = {}

        selectAll('[_]', content).forEach(el => content._[el.getAttribute('_')] = $(el))
    }

    /**
     * Finds all the elements with _listen="event1:callback1,event2:callback2" as attribute
     * and adds listener to those element where the callback is this.callback, this.callback2 ...
     */
    static _listen(element, content) {
        selectAll('[_listen]', content).forEach(el => {
            const strListeners = el.getAttribute('_listen')

            if (strListeners.length > 0) {
                strListeners.split(",").forEach(strListener => Template._listenHelper(strListener, el, element))
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