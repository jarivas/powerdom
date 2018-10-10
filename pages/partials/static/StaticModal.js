class StaticModal extends PartialTemplate {
    static showMorty(){
        ModalComponent.setContent("<p>Show me the Morty</p>").show(true);
    }
}