const closeBtn = `<br><br><button class="btn tiny" onclick="app.Modal.close()">Close</button>`
let DialogElementPD = null
let DialogElement = null

class Notification {
    static show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000

        DialogElementPD.removeAllClasses()
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
        DialogElementPD.removeAllClasses()
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

        DialogElementPD.removeAllClasses()
            .setContent(content)
    }

    static setContentElement(content) {
        DialogElementPD.removeAllClasses()
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
        DialogElement = app.select('dialog')

        DialogElementPD = app.PD(DialogElement)
        dialogPolyfill.registerDialog(DialogElement)
    }
}

export { Notification, Loading, Modal, UIHelpers }