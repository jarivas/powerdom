customElements.define('pd-toast',
    class extends HTMLElement {
        constructor() {
            super()

            const $this = PD.$(this)
            
            const content = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <img src="..." class="rounded me-2" alt="...">
                  <strong class="me-auto">Title</strong>
                  <small>Subtitle</small>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  body
                </div>
              </div>`
              $this.setContent(content.trim())

              const el = $this.select('div.toast')
              const title = $this.select('strong.me-auto')
              const subTitle = $this.select('small')
              const body = $this.select('div.toast-body')

              PD.Toast = new Toast(el, title, subTitle, body)
        }
    }
)

class Toast {
  constructor(el, title, subTitle, body) {
    this.toast = new bootstrap.Toast(el)
    this.title = PD.$(title)
    this.subTitle = PD.$(subTitle)
    this.body = PD.$(body)
  }

  setTitle(content) {
      this.title.setContent(content);
  }

  setSubtitle(content) {
      this.subTitle.setContent(content);
  }

  setBody(content) {
      this.body.setContent(content);
  }

  show() {
      this.toast.show()
  }

  hide() {
      this.toast.hide()
  }

  dispose() {
      this.toast.dispose()
  }
}