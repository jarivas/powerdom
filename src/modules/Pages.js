import Config from './Config.js'
import Importer from './Importer.js'
import Template from './Template.js'
import {
    PowerDom,
    select
} from './PowerDom.js'
import {
    Loading,
    UIHelpers
} from './UIHelpers.js'

const $ = PowerDom.getInstance
const config = Config.get()

class Pages {
    static init() {
        Pages.prototype.$title = $('title', document.head).setContent(config.title)

        Importer.importTemplate(config.layout, document.body).then(() => {
            PD.Template.parse(select('html'))
                .then(() => {
                    Pages.prototype.mainElement = select(config.mainElementSelector)

                    UIHelpers.init()

                    Pages.go('default')
                })
        })
    }
    static getPage(index) {
        const pages = config.pages
        let page = null

        if (index in pages)
            page = pages[index]

        return page
    }
    static fireImported() {
        Pages.prototype.imported()
    }
    static navigate(page) {
        Loading.show()

        Pages.prototype.imported = () => {
            Pages.prototype.$title.setContent(page.title)
            Template.parse(Pages.prototype.mainElement)
            Loading.close()
        }

        Importer.importTemplate(page.template, Pages.prototype.mainElement)
    }
    static go(index) {
        const page = Pages.getPage(index)

        if (!page)
            throw `Invalid page index: ${index}`

        Pages.navigate(page)
    }
}

export default Pages