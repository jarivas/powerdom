class NotificationComponent {
    constructor() {
        this.element = PD.find('.mdl-js-snackbar');
    }

    /**
     * 
     * @param {string} text 
     */
    show(text){
        window.NotificationComponent.element.MaterialSnackbar.showSnackbar({message: text});
        console.log(text);
    }
}