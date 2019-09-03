import Request from "../modules/Request"
import Template from "../modules/Template"

customElements.define('pd-tpl',
    class extends HTMLElement {
        constructor() {
            super()

            if (!this.dataset.hasOwnProperty('template')) {
                throw 'Template tag without data-template property'
            }

            Request.getRemoteText(this.dataset.template).then(html => {
                PD.$(this).setContent(html)

                if (this.dataset.hasOwnProperty('module')) {
                    import(this.dataset.module)
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
