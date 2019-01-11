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
        const instance = window.ModalComponent;
        
        instance.elementInnerContent.setContent(html);

        return instance;
    }


    /**
     * 
     * @param {boolean} [canClose=false] 
     */
    show(canClose) {
        const instance = window.ModalComponent;

        if (canClose) {
            this.elContent.prepend('<span class="close">&times;</span>');
            PD('span.close', instance.elementContent).listen('click', instance.close);
        }

        instance.el.removeClass('hidden');
    }

    close() {
        const instance = window.ModalComponent;
        let elementClose = PD('span.close', instance.elementContent);

        if (elementClose)
            elementClose.remove();

        instance.el.addClass('hidden');
    }
}