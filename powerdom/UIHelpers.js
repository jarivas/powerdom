const DialogElement = PD('dialog');
dialogPolyfill.registerDialog(DialogElement.getElements());
const closeBtn = `<br><br><button class="btn tiny" onclick="window.UIHelpers.Modal.close()">Close</button>`;

class Notification {
    static show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000;

        DialogElement.removeAllClasses()
            .addClass('notification')
            .setContent(message)
            .getElements()
            .show();

        setTimeout(() => {
            DialogElement.getElements().close();
        }, displayTime)
    }
}

class Loading {
    static show(displayTime) {
        DialogElement.removeAllClasses()
            .setContent('<span class="load"></span>')
            .getElements()
            .showModal();

        if (typeof displayTime != 'undefined') {
            setTimeout(() => {
                DialogElement.getElements().close();
            }, displayTime)
        }
    }

    static close() {
        DialogElement.getElements().close();
    }
}

class Modal {
    static setContent(content, addCloseBtn) {
        if (typeof addCloseBtn != 'undefined' && addCloseBtn)
            content = content.concat(closeBtn);

        DialogElement.removeAllClasses()
            .setContent(content);
    }

    static setContentElement(content) {
        DialogElement.removeAllClasses()
            .setContentElement(content);
    }

    static show() {
        DialogElement.getElements().showModal();
    }

    static close() {
        DialogElement.getElements().close();
    }
}

export { Notification, Loading, Modal }