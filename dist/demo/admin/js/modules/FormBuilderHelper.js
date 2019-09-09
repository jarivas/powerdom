class FormBuilderHelper {
    static saveForm(element){
        const data = {}
        const controller = element.controller
        const id = element._.id.getValue()
        const _ = element._

        for(let[key, input] of Object.entries(_)) {
            const value = input.getValue()

            if(value != '') {
                data[key] = value
            } else if(input.getProperty('required')) {
                return
            }
        }

        PD.Loading.show()

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

        if(result === true) {
            return PD.TableBuilderHelper.refresh()
        }

        console.error(result)
    }
}

export default FormBuilderHelper