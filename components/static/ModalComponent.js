class ModalComponent {
    static init() {
        const modal = PD.find('div.modal');
        let instance = new ModalComponent();

        instance.element = modal;

        instance.elementContent = PD.find('div.modal-content', modal);
        instance.elContent = PD(instance.elementContent);

        instance.elementInnerContent = PD('div.inner-content', modal);

        instance.el = PD(modal);

        window.ModalComponent = instance;
    }

    /**
     * 
     * @param {string} html 
     */
    setContent(html) {
        this.elementInnerContent.setContent(html);

        return this;
    }


    /**
     * 
     * @param {boolean} [canClose=false] 
     */
    show(canClose) {
        if (canClose) {
            this.elContent.prepend('<span class="close">&times;</span>');
            PD('span.close', this.elementContent).listen('click', this.close);
        }

        this.el.removeClass('hidden');
    }

    close() {
        let elementClose = PD('span.close', this.elementContent);

        if (elementClose)
            elementClose.remove();

        window.ModalComponent.el.addClass('hidden');
    }
}

export default ModalComponent;