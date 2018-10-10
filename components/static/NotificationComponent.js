class NotificationComponent {
    static init() {
        const notification = PD.find('.mdl-js-snackbar');

        NotificationComponent.prototype.element = notification;

        window.NotificationComponent = NotificationComponent;
    }

    /**
     * 
     * @param {string} text 
     */
    static show(text){
        NotificationComponent.prototype.element.MaterialSnackbar.showSnackbar({message: text});
        console.log(text);
    }
}
export default NotificationComponent;