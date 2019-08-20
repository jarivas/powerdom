class FormBuilderPosition extends PD.Template {
    getInputs() {
        this.controller = 'position'
        return [
            {
                type: "text",
                placeholder: "Company",
                required: 'required',
                _: "company",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "Name",
                required: 'required',
                _: "name",
                _listen: "keypress:listenEnter"
            },
            {
                type: "test",
                placeholder: "Description",
                required: 'required',
                _: "description",
                _listen: "keypress:listenEnter"
            },
            {
                type: "date",
                placeholder: "StartDate",
                required: 'required',
                _: "start_date",
                _listen: "keypress:listenEnter"
            },
            {
                type: "date",
                placeholder: "EndDate",
                required: 'required',
                _: "end_date",
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

export default FormBuilderPosition
