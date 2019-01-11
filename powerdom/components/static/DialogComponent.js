class DialogComponent {
    constructor() {
        const dialog = PD.find('dialog');

        if (!dialog.showModal)
            dialogPolyfill.registerDialog(dialog);

        this.element = dialog;
        this.elementTitle = PD('.mdl-dialog__title', dialog);
        this.elementContent = PD('.mdl-dialog__content', dialog);
        this.elementActions = PD('.mdl-dialog__actions', dialog);
    }

    /**
     * 
     * @param {int} headerSize 
     * @param {string} text 
     */
    setTitle(headerSize, text) {
        const instance = window.DialogComponent;

        instance.elementTitle.replace(`<h${headerSize} class="mdl-dialog__title">${text}</h${headerSize}>`);

        return instance;
    }

    /**
     * 
     * @param {string} html 
     */
    setContent(html) {
        const instance = window.DialogComponent;

        instance.elementContent.setContent(html);

        return instance;
    }

    /**
     * 
     * @param {{title: string, click: string}[]} buttons An array of objects that contain info to generate buttons
     * 
     * @returns {object} A reference to the instance
     */
    setActions(buttons) {
        const instance = window.DialogComponent;
        let html = '';

        buttons.forEach(button =>
            html += `<button type="button" class="mdl-button" onclick="${button.click}();">${button.title}</button>`
        );

        instance.elementActions.setContent(html);

        return instance;
    }

    show() {
        const instance = window.DialogComponent;

        instance.element.showModal();
        componentHandler.upgradeElement(instance.element);
    }

    close() {
        window.DialogComponent.element.close();
    }
}