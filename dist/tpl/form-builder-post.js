class FormBuilderPost extends PD.Template {
    getInputs() {
        this.controller = 'post'
        return [
            {
                type: "text",
                placeholder: "Title",
                required: 'required',
                _: "title",
                _listen: "keypress:listenEnter"
            },
            {
                textarea: true,
                placeholder: "Body",
                required: 'required',
                _: "body",
                _listen: "keypress:listenEnter"
            },
            {
                type: "text",
                placeholder: "Tags",
                required: 'required',
                _: "tags",
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

export default FormBuilderPost
