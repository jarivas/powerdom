import Request from "../modules/Request"
import Template from "../modules/Template"

customElements.define('pd-tpl',
    class extends HTMLElement {
        constructor() {
            super()

            if (!this.hasAttribute('template')) {
                throw 'Template tag without data-template property'
            }

            this.loadContent()
        }

        loadContent() {
            Request.getRemoteText(this.getAttribute('template')).then(html => {
                PD.$(this).setContent(html)

                if (this.hasAttribute('module')) {
                    import(this.getAttribute('module'))
                        .then(module => {
                            const instance = new module.default()

                            Template.process(this, instance)
                        })
                } else {
                    Template.setContent(this)
                }
            })
        }

        refresh() {
            PD.$(this).empty()

            this.loadContent()
        }
    })
