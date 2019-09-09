class FormBuilderCertification {
    getInputs() {
        this.controller = 'certification'
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
                placeholder: "Authority",
                required: 'required',
                _: "authority",
                _listen: "keypress:listenEnter"
            },
            {
                type: "date",
                placeholder: "Date",
                required: 'required',
                _: "date",
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

export default FormBuilderCertification
