class FormBuilderSocial {
    getInputs() {
        this.controller = 'social'
        return [
            {
                type: "text",
                placeholder: "Url",
                required: 'required',
                _: "url",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "Text",
                required: 'required',
                _: "text",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "Icon",
                required: 'required',
                _: "icon",
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
        PD.FormBuilderHelper.saveForm(this._, this._.id.getValue(), this.controller)
    }
}

export default FormBuilderSocial
