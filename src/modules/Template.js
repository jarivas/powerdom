import {
    selectAll
} from './PowerDom.js'
import Importer from './Importer.js'

import {CountDown} from './State'

class Template {
    static createUUID(){
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    static parse(element, callback) {
        const tpls = selectAll('tpl', element);
        const uiid = Template.createUUID()

        CountDown.set(uiid, tpls.length, callback)

        tpls.forEach(tpl => {
            const url = tpl.getAttribute('src')
            const module = tpl.getAttribute('class')

            Importer.importTemplate(url, tpl).then(() => {
                if(module)
                    Importer.importModule(module).then((className) => {
                        new className(tpl);
                        CountDown.decrease(uiid)
                    })
                else
                    CountDown.decrease(uiid)
            })
        })
    }

    constructor(element){
        this.el = element
        this.process()
        this.removeWrapper()
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
    }

}

export default Template