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
import {State} from './State.js'

const $ = PowerDom.getInstance
const config = Config.get()

/**
 * It is used to control the navigation between pages
 */
class Pages {

    /**
     * Required after imported, but you will never have to
     */
    static init() {
        Pages.prototype.$title = $('title', document.head).setContent(config.title)

        Importer.importTemplate(config.layout, document.body).then(() => {
            Pages.prototype.mainElement = select(config.mainElementSelector)

            UIHelpers.init()

            Pages.go('default')
        })
    }

    /**
     * Get the object that describes the page
     * @param {string} index 
     * @returns {Object}
     */
    static getPage(index) {
        const pages = config.pages
        let page = null

        if (index in pages)
            page = pages[index]

        return page
    }

    /**
     * Standard way of knowing the page is 100% loaded
     */
    static firePageReady() {
        State.fire(Pages.prototype.currenPage.title)
    }

    /**
     * Triigers the mechanism to change the current page using an Object
     * @param {Object} page 
     */
    static navigate(page) {
        Loading.show()

        Pages.prototype.currenPage = page

        State.listen(page.title, () => {
            Pages.prototype.$title.setContent(page.title)
            Loading.close()
        })

        Importer.importTemplate(page.template, Pages.prototype.mainElement)
            .then(() => Template.parse(Pages.prototype.mainElement, Pages.firePageReady))
    }
    
    /**
     * Triigers the mechanism to change the current page using an string
     * @param {string} index 
     */
    static go(index) {
        const page = Pages.getPage(index)

        if (!page)
            throw `Invalid page index: ${index}`

        Pages.navigate(page)
    }
}

export default Pages