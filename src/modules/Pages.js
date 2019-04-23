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
let config = null

/**
 * It is used to control the navigation between pages
 */
class Pages {

    /**
     * Required after imported, but you will never have to
     */
    static init() {
        const conf = Config.get()
        const layout = conf.layout
        const loadLayoutModule = (typeof layout == 'object')
        const lTemplate = (loadLayoutModule) ? layout.template : layout;
        const body = document.body;
        const success = (Layout) => {
            config = conf

            Layout.init()

            Pages.prototype.mainElement = select(conf.mainElementSelector)

            UIHelpers.init()

            Pages.go('default')
        }

        Pages.prototype.$title = $('title', document.head).setContent(conf.title)

        Importer.importTemplate(lTemplate, body).then(() => {

            body.appendChild(document.createElement('dialog'))

            if(loadLayoutModule){
                Importer.importModule(layout.module).then(success)
            } else {
                success()
            }

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
        const mainElement = Pages.prototype.mainElement
        const ready = () => Template.parse(mainElement, Pages.firePageReady)
        Loading.show()

        Pages.prototype.currenPage = page

        State.listen(page.title, () => {
            Pages.prototype.$title.setContent(page.title)
            Loading.close()
        })

        Importer.importTemplate(page.template, mainElement)
            .then(() => {
                if(page.hasOwnProperty('module'))
                    Importer.importModule(page.module).then(template => {
                        new template(mainElement, ready)
                    })
                else
                    ready()
            })
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

    /**
     * Check if element is the one where all the pages are imported
     * @param {Element} element 
     */
    static isMainElement(element) {
        return Pages.prototype.mainElement.isSameNode(element);
    }
}

export default Pages