class FormBuilderHelper {
    static saveForm(element) {
        const data = {}
        const controller = element.controller
        const id = element._.id.getValue()
        const _ = element._

        FormBuilderHelper.prototype.controller = controller

        for (let [key, input] of Object.entries(_)) {
            const value = FormBuilderHelper.isSelect(input) ? FormBuilderHelper.getSelectedOptions(input)
                : input.getValue()

            if (value.length > 0) {
                data[key] = value
            } else if (input.getProperty('required')) {
                return
            }
        }

        PD.Loading.show()

        if (id == '') {
            PD.Request.post(`${controller}/create`, data, PD.RequestHelper.handleError, {token: PD.Auth.token})
                .then(FormBuilderHelper.handleResponse)
        } else {
            PD.Request.put(`${controller}/updateOne`, {id: id}, data, PD.RequestHelper.handleError, {token: PD.Auth.token})
                .then(FormBuilderHelper.handleResponse)
        }
    }

    static isSelect(input) {
        return (typeof input.select('option') != 'undefined')
    }

    static getSelectedOptions(input) {
        const selected = []

        input.selectAll('option').forEach(option => {
            if (option.selected) {
                selected.push(option.value)
            }
        })

        return selected
    }

    static setSelectedOptions(input, values) {
        input.selectAll('option').forEach(option => {
            option.selected = values.includes(option.value)
        })
    }

    static handleResponse(r) {
        PD.Loading.close()

        if (r === true) {
            return PD.Page.go(FormBuilderHelper.prototype.controller)
        }

        console.error(r)
    }
}

export default FormBuilderHelper