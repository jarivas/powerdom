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

        this._elements()

        this._listen()

        this.process().then(() => {
            if(!Pages.isMainElement(element))
                this.removeWrapper()

            this.ready()
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
            strListeners.split(",").forEach(strListener => _listenHelper(strListener, el, this))
        });
    }

    /**
     * Asynchronous function ready to be overriden to fit whatever the need in the class
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
