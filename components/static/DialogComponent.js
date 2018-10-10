class DialogComponent {
    static init() {
        const dialog = PD.find('dialog');
        let instance = new DialogComponent();

        if (!dialog.showModal)
            dialogPolyfill.registerDialog(dialog);

        instance.element = dialog;
        instance.elementTitle = PD('.mdl-dialog__title', dialog);
        instance.elementContent = PD('.mdl-dialog__content', dialog);
        instance.elementActions = PD('.mdl-dialog__actions', dialog);

        window.DialogComponent = instance;
    }

    /**
     * 
     * @param {int} headerSize 
     * @param {string} text 
     */
    setTitle(headerSize, text) {
        this.elementTitle.replace(`<h${headerSize} class="mdl-dialog__title">${text}</h${headerSize}>`);

        return this;
    }

    /**
     * 
     * @param {string} html 
     */
    setContent(html) {
        this.elementContent.setContent(html);

        return this;
    }

    /**
     * 
     * @param {{title: string, click: string}[]} buttons An array of objects that contain info to generate buttons
     * 
     * @returns {object} A reference to the instance
     */
    setActions(buttons) {
        let html = '';

        buttons.forEach(button =>
            html += `<button type="button" class="mdl-button" onclick="${button.click}();">${button.title}</button>`
        );

        this.elementActions.setContent(html);

        return this;
    }

    show() {
        this.element.showModal();
        componentHandler.upgradeElement(this.element);
    }

    close() {
        this.element.close();
    }
}

export default DialogComponent;