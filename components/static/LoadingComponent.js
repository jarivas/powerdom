class LoadingComponent {
    static init(){
        window.LoadingComponent = LoadingComponent;
    }

    static show(){
        window.ModalComponent
            .setContent('<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>')
            .show();

        componentHandler.upgradeElement(PD.find('.mdl-progress'));
    }

    static close(){
        window.ModalComponent.close();
    }
}

export default LoadingComponent;