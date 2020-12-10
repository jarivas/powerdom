import Request from "../modules/Request.js"
import Template from "../modules/Template.js"
import Config from "../modules/Config.js"
import State from "../modules/State.js"
import {PowerDom as PD} from "../modules/PowerDom.js"

customElements.define('pd-page',
    class extends HTMLElement {
        constructor() {
            super()

            Request.getRemoteText(this).then(data => {
                Config.set(JSON.parse(data))

                this.pages = Config.get('pages')
                this.currentTitle = PD.$('title', document.head)
    
                State.listen('layoutReady', () => this.NavigateIndex('default'))
            })
        }

        /**
         * Get the object that describes the page
         * @param {string} index
         * @returns {Object}
         */
        getPage(index) {
            const pages = this.pages
            let page = null

            if (index in pages)
                page = pages[index]

            return page
        }

        /**
         * Triggers the mechanism to change the current page using an string
         * @param {string} index
         */
        NavigateIndex(index) {
            const page = this.getPage(index)

            if (!page)
                throw `Invalid page index: ${index}`

            this.navigate(page)
        }

        /**
         * Triggers the mechanism to change the current page using an Object
         * @param {Object} page
         */
         navigate(page) {
            this.currentTitle.setContent(page.title)

            Request.getRemoteText(page.template).then(html => {
                PD.$(this).setContent(html)

                if (page.hasOwnProperty('module')) {
                    import(page.module)
                        .then(module => {
                            const instance = new module.default()

                            Template.process(this, instance)
                        })
                } else {
                    Template.setContent(this)
                }
            })
        }
    })