import {
    selectAll
} from './PowerDom.js'
import Importer from './Importer.js'

import {CountDown} from './State'
import Pages from './Pages.js';

let dt = null

function createUUIDHelper(c) {
    let r = (dt + Math.random()*16)%16 | 0
    dt = Math.floor(dt/16)

    return (c=='x' ? r :(r&0x3|0x8)).toString(16)
}

function createUUID(){
    dt = new Date().getTime()

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, createUUIDHelper)
}

function _listenHelper(strListener, el, instance){
    const [event, callback] = strListener.split(':')

    PD.$(el).listen(event, instance[callback].bind(instance))
}

const evalHelper = {
    do: (code) => {
        return eval(code)
    }
}

function loopArrayHelper(items, el) {
    const tpl = el.innerHTML.trim().replace(/(\r\n|\n|\r)/gm,"")
    let html = ''

    if(items.length == 0) return el.remove()

    items.forEach(item => {
        const regexItemPropTest = /\${item\.([a-z|_/\$]*)}/gm
        const regexItem = /\${item}/gm
        const regexItemProp = new RegExp('\\${item\\.([a-z|_/\\$]*)}', 'gm')

        if(tpl.length > 0) {
            if(regexItem.test(tpl)) {
                html += tpl.replace(regexItem, item)
            }

            if(regexItemPropTest.test(tpl)) {
                const matches = Array.from(tpl.matchAll(regexItemProp))

                html += tpl
                matches.forEach(m => html = html.replace(m[0], item[m[1]]))
            }
        } else {
            html += item
        }
    })

    PD.$(el).replace(html)
}

/**
 * It handles the template manipulation
 */
class Template {

    /**
     * Search for template elements defined in the element, replace them with the right html
     * and invokes the callback when all is ready
     * @param {Document|DocumentFragment|Element} element
     * @param {function} callback
     */
    static parse(element, callback) {
        const dir = PD.Config.get('tpl').dir
        const tpls = selectAll('tpl', element);
        let uiid = null

        if(tpls.length == 0)
            return callback()

        uiid = createUUID()
        CountDown.set(uiid, tpls.length, callback)

        tpls.forEach(tpl => {
            const url = dir + tpl.getAttribute('src')
            const module = dir + tpl.getAttribute('module')
            const fire = tpl.getAttribute('fire')
            const ready = () => {
                if(fire) fire()
                CountDown.decrease(uiid)
            }

            Importer.importTemplate(url, tpl).then(() => {
                if(module)
                    Importer.importModule(module).then((className) => new className(tpl, ready))
                else
                    ready()
            })
        })
    }

    /**
     * When the parsed template element have a module attribute, it uses as
     * url of a module to import. This module should extend from Template.
     * @param {Document|DocumentFragment|Element} element tpl node that is going to be processed
     * @param {function} ready callback that will be invoke once all is ready
     */
    constructor(element, ready){
        this.el = element
        this.ready = ready

        this.loopArray().then(() => {
            this.loopObject()

            this._elements()

            this._listen()

            this.process().then(() => {
                if(!Pages.isMainElement(element))
                    this.removeWrapper()

                this.ready()
            })
        })
    }

    /**
     * Finds all the elements with _ as attribute and attach them to the current
     * instance
     */
    _elements() {
        this._ = {}

        PD.selectAll('[_]', this.el).forEach(el => this._[el.getAttribute('_')] = PD.$(el))
    }

    /**
     * Finds all the elements with _listen="event1:callback1,event2:callback2" as attribute
     * and adds listener to those element where the callback is this.callback, this.callback2 ...
     */
    _listen() {
        PD.selectAll('[_listen]', this.el).forEach(el => {
            const strListeners = el.getAttribute('_listen')

            if (strListeners.length > 0) {
                strListeners.split(",").forEach(strListener => _listenHelper(strListener, el, this))
            }

            el.removeAttribute('_listen')
        })
    }

     async loopArray(){
        for (const el of PD.selectAll('template[loop-array]', this.el)) {
            let itemsFunction = el.getAttribute('items')
            let items = null

            itemsFunction = itemsFunction.replace('()', '')
            items = this[itemsFunction]()

            if(items instanceof Promise) {
                await items.then(result => loopArrayHelper(result, el))
            } else {
                loopArrayHelper(items, el)
            }
        }
     }

    /**
     * Loops over all the keys of a object (items) and generates new html using the content as template.
     * In that template a couple of variables can be used key and item, to represent the current key and value
     */
    loopObject() {
        let html = ''

        /* @TODO: read again the web components, custom elements and replace tpl and template */

        PD.selectAll('template[loop-object]', this.el).forEach(el => {
            const items = evalHelper.do(el.getAttribute('items'))
            const tpl = el.innerHTML.trim()
            const regexKey = /\${key}/gm
            const regexItemProp = new RegExp('\\${item\\.([a-z|_/\\$]*)}', 'gm')

            for(let [key, item] of Object.entries(items)){
                html += tpl.replace(regexKey, key)

                if(typeof item != 'object') {
                    html = html.replace(regexItem, item)
                } else {
                    let array = Array.from(tpl.matchAll(regexItemProp))

                    if (typeof array != 'undefined' && array[0].length > 0){
                        array = array[0]

                        for(let i = 1; i < array.length; ++i) {
                            html = html.replace(array[0], item[array[i]])
                        }
                    }
                }
            }

            PD.$(el).replace(html)
        })
    }

    /**
     * Asynchronous function ready to be overwritten to fit whatever the need in the class
     */
    async process(){}

    /**
     * Removes the template outerHTML and invokes the ready function
     */
    removeWrapper(){
        const el = this.el
        const parent = el.parentElement

        while (el.hasChildNodes())
            parent.insertBefore(el.firstChild, el);

        parent.removeChild(el)
        delete this.el
    }

}

export default Template
