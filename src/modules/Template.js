import {PowerDom, selectAll} from './PowerDom.js'
import Importer from './Importer.js'

const $ = PowerDom.getInstance

class Template {
    static parse(element) {
        selectAll('tpl', element).forEach(Template.import)
    }

    static import(tpl) {
        const url = tpl.getAttribute('src')

        Importer.importTemplate(url, tpl, true)
    }
}

export default Template