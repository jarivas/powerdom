import Request from "../modules/Request"
import Template from "../modules/Template"

customElements.define('pd-page',
    class extends HTMLElement {
        constructor() {
            super()

            this.pages = PD.Config.get('pages')
            this.currentTitle = PD.$('title', document.head)

            PD.Page = this

            this.go('default')
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
        go(index) {
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
                                .then(instance.process.bind(instance))
                        })
                } else {
                    Template.replace(this)
                }
            })
        }
    })