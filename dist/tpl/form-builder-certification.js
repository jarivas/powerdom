class FormBuilderCertification extends PD.Template {
    getInputs() {
        return [
            {
                type: "text",
                placeholder: "Name",
                _: "name",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "Authority",
                _: "authority",
                _listen: "keypress:listenEnter"
            },
            {
                type: "date",
                placeholder: "Date",
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
        if(this._.saveBtn.getValue() == '') {
            //Create
        }
        //Update
    }
}

export default FormBuilderCertification
