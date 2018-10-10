class LoadingComponent {
    show(){
        ModalComponent
            .setContent('<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>')
            .show();

        componentHandler.upgradeElement(PD.find('.mdl-progress'));
    }

    close(){
        ModalComponent.close();
    }
}