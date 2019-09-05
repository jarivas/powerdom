import Request from "../modules/Request"
import Template from "../modules/Template"

customElements.define('pd-tpl',
    class extends HTMLElement {
        constructor() {
            super()

            if (!this.hasAttribute('template')) {
                throw 'Template tag without data-template property'
            }

            Request.getRemoteText(this.getAttribute('template')).then(html => {
                PD.$(this).setContent(html)

                if (this.hasAttribute('module')) {
                    import(this.getAttribute('module'))
                        .then(module => {
                            const instance = new module.default()

                            Template.process(this, instance, true)
                        })
                } else {
                    Template.setContent(this, true)
                }
            })
        }
    })
