const DialogElement = PD('dialog');

class Notification {
    static show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000;

        DialogElement.removeAllClasses()
            .addClass('notification')
            .setContent(message)
            .getElements()
            .show();

        
    }
}

class Loading {

}

class Modal {

}

export {Notification, Loading, Modal}