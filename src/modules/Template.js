import {
    selectAll
} from './PowerDom.js'
import Importer from './Importer.js'

import {CountDown} from './State'

function createUUID(){
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

class Template {

    static parse(element, callback) {
        const tpls = selectAll('tpl', element);
        const uiid = createUUID()

        CountDown.set(uiid, tpls.length, callback)

        tpls.forEach(tpl => {
            const url = tpl.getAttribute('src')
            const module = tpl.getAttribute('module')
            const fire =  tpl.getAttribute('fire')
            const ready = () => {
                if(fire) fire()
                CountDown.decrease(uiid)
            }

            Importer.importTemplate(url, tpl).then(() => {
                if(module)
                    Importer.importModule(module).then((className) => {
                        new className(tpl);
                        ready()
                    })
                else
                    ready()
            })
        })
    }

    constructor(element){
        this.el = element

        PD.selectAll('[_]', element).forEach(el => this[el.getAttribute('_')] = el)
        
        PD.selectAll('[_listen]').forEach(el => {
            const strListeners = el.getAttribute('_listen')
            strListeners.split(",").forEach(strListener => this._listenHelper(strListener, el))
        });

        this.process()
        this.removeWrapper()
    }

    _listenHelper(strListener, el){
        const [event, callback] = strListener.split(':')

        PD.$(el).listen(event, this[callback].bind(this))
    }

    process(){
        //Overwrite on class
    }

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