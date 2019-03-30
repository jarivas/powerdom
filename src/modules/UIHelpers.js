import {select} from './src/modules/PowerDom.js'

const closeBtn = `<br><br><button class="btn tiny" onclick="DialogElement.close()">Close</button>`
let DialogElement$ = null
let DialogElement = null

class Notification {
    static show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000

        DialogElement$.removeAllClasses()
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
        DialogElement$.removeAllClasses()
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

        DialogElement$.removeAllClasses()
            .setContent(content)
    }

    static setContentElement(content) {
        DialogElement$.removeAllClasses()
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

        DialogElement$ = $(DialogElement)
        dialogPolyfill.registerDialog(DialogElement)

        return DialogElement
    }
}

export { Notification, Loading, Modal, UIHelpers }