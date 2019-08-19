class FormBuilderCertification extends PD.Template {
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
        const id = this._.id.getValue()
        const data = {}

        for(let[key, input] of Object.entries(this._)) {
            const value = input.getValue()

            if(value != '') {
                data[key] = value
            } else if(input.getProperty('required')) {
                return
            }
        }

        if(id == '') {
            this.create(data)
        } else {
            this.update(id, data)
        }
    }

    create(data){
        PD.Loading.show();
        PD.Request.post(`${this.controller}/create`, data, PD.Request.handleError, {token: PD.Modules.Auth.token})
            .then(this.handleResponse.bind(this))
    }

    update(id, data){
        PD.Loading.show();
        PD.Request.put(`${this.controller}/updateOne`, {id: id}, data, PD.Request.handleError, {token: PD.Modules.Auth.token})
            .then(this.handleResponse.bind(this))
    }


    handleResponse(result){
        PD.Loading.close()

        if(result === true) return PD.Pages.go(this.controller)

        console.error(result)
    }
}

export default FormBuilderCertification
