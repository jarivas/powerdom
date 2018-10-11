class ModalComponent {
    constructor() {
        const modal = PD.find('div.modal');

        this.element = modal;

        this.elementContent = PD.find('div.modal-content', modal);
        this.elContent = PD(this.elementContent);

        this.elementInnerContent = PD('div.inner-content', modal);

        this.el = PD(modal);
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

        this.el.addClass('hidden');
    }
}