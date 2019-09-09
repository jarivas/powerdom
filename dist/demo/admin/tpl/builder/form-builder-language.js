class FormBuilderLanguage {
    getInputs() {
        this.controller = 'language'
        return [
            {
                type: "text",
                placeholder: "Name",
                required: 'required',
                _: "name",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "Level",
                required: 'required',
                _: "level",
                _listen: "keypress:listenEnter"
            }
        ]
    }

    listenEnter(e) {
        if (e.key.toUpperCase() == 'ENTER') {
            this.saveForm()
        }
    }

    saveForm(){
        PD.FormBuilderHelper.saveForm(this)
    }
}

export default FormBuilderLanguage
