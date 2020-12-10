import {PowerDom as PD} from "../modules/PowerDom.js"

customElements.define('pd-modal',
    class extends HTMLElement {
        constructor() {
            super()

            const $this = PD.$(this)
            
            const content =
                `<div class="modal fade modal-dialog modal-dialog-centered modal-dialog-scrollable"
                id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    </div>
                    <div class="modal-body">
                      body
                    </div>
                    <div class="modal-footer">
                      footer
                    </div>
                  </div>
                </div>
              </div>`
              $this.setContent(content.trim())

              const el = $this.select('div#staticBackdrop')
              const header = $this.select('h5.modal-title')
              const body = $this.select('div.modal-body')
              const footer = $this.select('div.modal-footer')

              PD.Modal = new Modal(el, header, body, footer)
              PD.Loading = new Loading(PD.Modal)
        }
    }
)

class Modal {
    constructor(el, header, body, footer) {
        this.modal = new bootstrap.Modal(el)
        this.header = PD.$(header)
        this.body = PD.$(body)
        this.footer = PD.$(footer)
    }

    setHeader(content) {
        this.header.setContent(content)
    }

    setBody(content) {
        this.body.setContent(content);
    }

    setFooter(content) {
        this.footer.setContent(content);
    }

    toggle() {
        this.modal.toggle()
    }

    show() {
        this.modal.show()
    }

    hide() {
        this.modal.hide()
    }

    handleUpdate() {
        this.modal.handleUpdate()
    }

    dispose() {
        this.modal.dispose()
    }

    dispose() {
        this.modal.dispose()
    }
}

class Loading {
    constructor(modal) {
        this.modal = modal
        this.text = `<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`.trim()
    }

    show() {
        this.modal.setHeader('Loading')
        this.modal.setBody(this.text)
        this.modal.setFooter('');
        this.modal.show()
    }

    hide() {
        this.modal.hide()
    }
}