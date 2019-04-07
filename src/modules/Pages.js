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
let states = null

class Pages {
    static init() {
        Pages.prototype.$title = $('title', document.head).setContent(config.title)

        states = PD.State

        Importer.importTemplate(config.layout, document.body).then(() => {
            PD.Template.parse(document.body)

            Pages.prototype.mainElement = select(config.mainElementSelector)

            UIHelpers.init()

            Pages.go('default')
        })
    }

    static getPage(index) {
        const pages = config.pages
        let page = null

        if (index in pages)
            page = pages[index]

        return page
    }

    static firePageReady() {
        states.fire(Pages.prototype.currenPage.title)
    }

    static navigate(page) {
        Loading.show()

        Pages.prototype.currenPage = page

        states.listen(page.title, () => {
            Pages.prototype.$title.setContent(page.title)
            Template.parse(Pages.prototype.mainElement)
            Loading.close()
        })

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