class FormBuilderEducation {
    getInputs() {
        this.controller = 'education'
        return [
            {
                type: "text",
                placeholder: "Notes",
                required: 'required',
                _: "notes",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "SchoolName",
                required: 'required',
                _: "school_name",
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
        PD.FormBuilderHelper.saveForm(this)
    }
}

export default FormBuilderEducation