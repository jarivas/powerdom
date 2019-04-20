import dialogPolyfill from 'dialog-polyfill'
import {PowerDom, select} from './PowerDom.js'

const $ = PowerDom.getInstance
const closeBtn = `<br><br><button class="btn tiny" onclick="PD.Modal.close()">Close</button>`
let $dialog = null
let DialogElement = null

/**
 * Displays a text as a notification
 */
class Notification {

    /**
     * Displays the text for a period of time, default 2 seconds
     * @param {string} message 
     * @param {int} [displayTime] milliseconds
     */
    static show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000

        $dialog.removeAllClasses()
            .addClass('notification')
            .setContent(message)
            .getElements()
            .show()

        setTimeout(() => {
            DialogElement.close()
        }, displayTime)
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
    static show(displayTime) {
        $dialog.removeAllClasses()
            .setContent('<span class="load"></span>')
            .getElements()
            .showModal()

        if (typeof displayTime != 'undefined') {
            setTimeout(() => {
                DialogElement.close()
            }, displayTime)
        }
    }

    /**
     * Hides the spinner and the UI is usable again
     */
    static close() {
        DialogElement.close()
    }
}

/**
 * Displays an HTML in a pop up blocking the rest of the UI
 */
class Modal {
    /**
     * Generates the pop up content using an html string
     * @param {string} content 
     * @param {boolean} addCloseBtn 
     */
    static setContent(content, addCloseBtn) {
        if (typeof addCloseBtn != 'undefined' && addCloseBtn)
            content = content.concat(closeBtn)

        $dialog.removeAllClasses()
            .setContent(content)
    }

    /**
     * Generates the content using objects that implement the node interface
     * @param {Document|DocumentFragment|Element} content 
     */
    static setContentElement(content) {
        $dialog.removeAllClasses()
            .setContentElement(content)
    }

    /**
     * Displays a pop up with previously generated content and makes the user focus on it by
     * blocking the rest of the UI
     */
    static show() {
        DialogElement.showModal()
    }

    /**
     * Hides the pop up
     */
    static close() {
        DialogElement.close()
    }
}

/**
 * A helper class in order initiate the others
 */
class UIHelpers {
    static init() {
        DialogElement = select('dialog')

        $dialog = $(DialogElement)
        dialogPolyfill.registerDialog(DialogElement)
    }
}

export { Notification, Loading, Modal, UIHelpers }