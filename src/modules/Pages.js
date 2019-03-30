import Config from './src/modules/Config.js'
import Importer from './src/modules/Importer.js'
import Template from './src/modules/Template.js'
import {PowerDom, select} from './src/modules/PowerDom.js'
import {Loading, UIHelpers} from './src/modules/UIHelpers.js'

const config = Config.get()
const $ = PowerDom.getInstace

class Pages {
    static init() {
        const head = $(document.head)

        config.meta.forEach(meta => head.prepend(`<meta ${meta}>`))

        Importer.loadMultipleJs(config.js).then(() => {
            config.css.forEach(css => Importer.loadCss(css))
    
            Template.parse(select('html')).then(() => {
                Pages.prototype.mainElement = select(config.mainElementSelector)

                UIHelpers.init()

                Pages.go('default')
            })
        })
    }
    static getPage(index) {
        const pages = config.pages
        let page = null

        if(index in pages)
            page = pages[index]

        return page
    }
    static fireImported(){
        Pages.prototype.imported()
    }
    static navigate(page) {
        Loading.show()

        Pages.prototype.imported = () => {
            config.title = page.title
            Template.parse(Pages.prototype.mainElement)
            Loading.close()
        }

        Importer.importTemplate(page.template, Pages.prototype.mainElement)
    }
    static go (index) {
        const page = Pages.getPage(index)

        if(!page)
            throw `Invalid page index: ${index}`

        Pages.navigate(page)
    }
}

export default Pages