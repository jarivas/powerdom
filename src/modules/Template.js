import {
    selectAll
} from './PowerDom.js'
import Importer from './Importer.js'

class Template {
    static parse(element) {
        selectAll('tpl', element).forEach(tpl => {
            const url = tpl.getAttribute('src')
            const jsUrl = tpl.getAttribute('module')

            Importer.importTemplate(url, tpl).then(() => {
                if(jsUrl)
                    Importer.importModule(jsUrl).then((className) => new className(tpl))
            })
        })
    }

    constructor(element){
        this.el = element
        this.process()
        this.removeWrapper()

    }

    process(){

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