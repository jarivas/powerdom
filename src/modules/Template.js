import {selectAll, select, PowerDom as PD} from "./PowerDom";

class Template {

    static process(element) {
        const template = select('template', element)
        const content = template.content

        Template.loop(element, content).then(() => {
                Template._elements(content)

                Template._listen(element, content)

                if (element.dataset.hasOwnProperty('ready')) {
                    this[element.dataset.ready]()
                }
            }
        )
    }

    static async loop(element, content) {
        selectAll('[pd-loop]', content).forEach(el => {
            if (!el.hasAttribute('data')) {
                PD.$(el).remove()
            } else {
                const dataAttr = el.getAttribute('data')
                let data = (typeof element[dataAttr] === 'function') ? element[dataAttr]() : element[dataAttr]

                console.log('data', data)
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