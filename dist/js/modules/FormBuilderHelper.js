class FormBuilderHelper {
    static saveForm(_, id, controller){
        const data = {}

        FormBuilderHelper.prototype.controller = controller

        for(let[key, input] of Object.entries(_)) {
            const value = input.getValue()

            if(value != '') {
                data[key] = value
            } else if(input.getProperty('required')) {
                return
            }
        }

        PD.Loading.show();
        if(id == '') {
            PD.Request.post(`${controller}/create`, data, PD.RequestHelper.handleError, {token: PD.Auth.token})
                .then(FormBuilderHelper.handleResponse)
        } else {
            PD.Request.put(`${controller}/updateOne`, {id: id}, data, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(FormBuilderHelper.handleResponse)
        }
    }

    static handleResponse(result){
        PD.Loading.close()

        if(result === true) return PD.Pages.go(FormBuilderHelper.prototype.controller)

        console.error(result)
    }
}

export default FormBuilderHelper