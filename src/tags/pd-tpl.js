import {PowerDom as PD} from "../modules/PowerDom"
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

                if (this.dataset.hasOwnProperty('class')) {
                    import(this.dataset.class).then(trait => {
                        for (let [name, method] of Object.entries(trait)) {
                            this[name] = method
                        }

                        Template.process(this)
                    })
                } else {
                    Template.process(this)
                }
            })
        }
    })
