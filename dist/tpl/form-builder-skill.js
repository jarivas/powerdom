class FormBuilderSkill extends PD.Template {
    getInputs() {
        this.controller = 'skill'
        return [
            {
                type: "text",
                placeholder: "Name",
                required: 'required',
                _: "name",
                _listen: "keypress:listenEnter"
            },
            {
                type: "number",
                placeholder: "Percentage",
                required: 'required',
                _: "percentage",
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
        PD.Modules.FormBuilderHelper.saveForm(this._, this._.id.getValue(), this.controller)
    }
}

export default FormBuilderSkill
