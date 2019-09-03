const loadingHtml = '<div class="center"><span class="load"></span></div>'
const closeBtn = '<span class="close">&times;</span>'
let modal = null
let modalBody = null

function show() {
    modal.style.display = "block";
}

function close() {
    modal.style.display = "none";
}

/**
 * Displays a text as a notification
 */
class Notification {
    /**
     * Displays the text for a period of time, default 2 seconds
     * @param {string} message
     * @param {int} [displayTime] milliseconds
     */
    show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000

        modalBody.setContent(`<div class="center">${message}</div>`)

        show()

        setTimeout(close, displayTime)
    }
}

/**
 * Displays a spinner
 */
class Loading {
    /**
     * Displays a spinner for a period of time
     * @param {int} displayTime milliseconds
     */
    show(displayTime) {
        modalBody.setContent(loadingHtml)

        show()

        if (typeof displayTime != 'undefined') {
            setTimeout(close, displayTime)
        }
    }

    /**
     * Hides the spinner and the UI is usable again
     */
    close() {
        close()
    }
}

/**
 * Displays an HTML in a pop up blocking the rest of the UI
 */
class Modal {
    constructor() {
        this.row = null
    }

    /**
     * Generates the pop up content using an html string
     * @param {string|Document|DocumentFragment|Element} content
     * @param {boolean} addCloseBtn
     */
    setContent(content, addCloseBtn) {
        if(typeof addCloseBtn != 'undefined' && addCloseBtn) {
            this.row = PD.$('.row', modal)
            this.row.prepend(closeBtn)
            PD.$('span.close', modal).listen('click', this.close.bind(this))
        }

        modalBody.setContent(content)
    }

    /**
     * Displays a pop up with previously generated content and makes the user focus on it by
     * blocking the rest of the UI
     */
    show() {
        show()
    }

    /**
     * Hides the pop up
     */
    close() {
        if (this.row != null) {
            PD.$('span.close', modal).remove()
            this.row = null
        }

        close()
    }
}

customElements.define('pd-modal',
    class extends HTMLElement {
        constructor() {
            super()

            // build
            const content =
                `<div class="modal-content">
                    <div class="row">
                        <div class="section">          
                            <div class="modal-body"></div>
                        </div>
                    </div>
                </div>`
            PD.$(this).setContent(content.trim())

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = (event) => {
                if (event.target == this) {
                    close(this)
                }
            }

            // UI tools
            modal = this
            modalBody = PD.$('.modal-body', this)

            PD.Notification = new Notification()
            PD.Loading = new Loading()
            PD.Modal = new Modal()
        }
    })
