import {PowerDom as PD} from "../modules/PowerDom"

function show(modal) {
    modal.style.display = "block";
}

function close(modal) {
    modal.style.display = "none";
}

const closeBtn = '<span class="close">&times;</span>'

/**
 * Displays a text as a notification
 */
class Notification {
    constructor(modal, modalBody) {
        this.modal = modal
        this.modalBody = modalBody
    }

    /**
     * Displays the text for a period of time, default 2 seconds
     * @param {string} message
     * @param {int} [displayTime] milliseconds
     */
    show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000

        this.modalBody.setContent(message)

        show(this.modal)

        setTimeout(() => {
            close(this.modal)
        }, displayTime)
    }
}

/**
 * Displays a spinner
 */
class Loading {
    constructor(modal, modalBody) {
        this.modal = modal
        this.modalBody = modalBody
    }

    /**
     * Displays a spinner for a period of time
     * @param {int} displayTime milliseconds
     */
    show(displayTime) {
        this.modalBody.setContent('<span class="load"></span>')

        show(this.modal)

        if (typeof displayTime != 'undefined') {
            setTimeout(() => {
                close(this.modal)
            }, displayTime)
        }
    }

    /**
     * Hides the spinner and the UI is usable again
     */
    close() {
        close(this.modal)
    }
}

/**
 * Displays an HTML in a pop up blocking the rest of the UI
 */
class Modal {
    constructor(modal, modalBody) {
        this.modal = modal
        this.modalBody = modalBody
        this.row = null
    }

    /**
     * Generates the pop up content using an html string
     * @param {string|Document|DocumentFragment|Element} content
     * @param {boolean} addCloseBtn
     */
    setContent(content, addCloseBtn) {
        if(typeof addCloseBtn != 'undefined' && addCloseBtn) {
            this.row = PD.$('.row', this.modal)
            this.row.prepend(closeBtn)
            PD.$('span.close', this.modal).listen('click', this.close.bind(this))
        }

        this.modalBody.setContent(content)
    }

    /**
     * Displays a pop up with previously generated content and makes the user focus on it by
     * blocking the rest of the UI
     */
    show() {
        show(this.modal)
    }

    /**
     * Hides the pop up
     */
    close() {
        if (this.row != null) {
            PD.$('span.close', this.modal).remove()
            this.row = null
        }

        close(this.modal)
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
            const modalBody = PD.$('.modal-body')

            this.notification = new Notification(this, modalBody)
            this.loading = new Loading(this, modalBody)
            this.modal = new Modal(this, modalBody)
        }
    })
