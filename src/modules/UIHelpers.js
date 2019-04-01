import dialogPolyfill from 'dialog-polyfill'
import {PowerDom, select} from './PowerDom.js'

const $ = PowerDom.getInstance
const closeBtn = `<br><br><button class="btn tiny" onclick="PD.Modal.close()">Close</button>`
let $dialog = null
let DialogElement = null

class Notification {
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

class Loading {
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

    static close() {
        DialogElement.close()
    }
}

class Modal {
    static setContent(content, addCloseBtn) {
        if (typeof addCloseBtn != 'undefined' && addCloseBtn)
            content = content.concat(closeBtn)

        $dialog.removeAllClasses()
            .setContent(content)
    }

    static setContentElement(content) {
        $dialog.removeAllClasses()
            .setContentElement(content)
    }

    static show() {
        DialogElement.showModal()
    }

    static close() {
        DialogElement.close()
    }
}

class UIHelpers {
    static init() {
        DialogElement = select('dialog')

        $dialog = $(DialogElement)
        dialogPolyfill.registerDialog(DialogElement)
    }
}

export { Notification, Loading, Modal, UIHelpers }