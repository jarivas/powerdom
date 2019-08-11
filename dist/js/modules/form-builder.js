class FormBuilder extends PD.Template {
    getInputs() {
        return [
            {
                type: "text",
                placeholder: "Placeholder",
                _: "identifier",
                _listen: "keypress:listenEnter"
            }
        ]
    }
}

export default FormBuilder
