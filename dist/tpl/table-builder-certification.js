class FormBuilderCertification extends PD.Template {
    getHeaders() {
        return ['Name', 'Authority', 'Date']
    }

    getRows() {
        return PD.Request.get('certification/read', {}, this.errorHandler, {token: PD.Modules.Auth.token})
            .then(r => {
                let result = []

                if(!Array.isArray(r)) return result

                r.forEach(row => result.push(`<tr id="${row.Id}"><td>${row.Name}</td><td>${row.Authority}</td><td>${row.Date}</td></tr>`))

                return result
            })
    }

    errorHandler(data){
        console.log(data)
    }

    addNew() {

    }
}

export default FormBuilderCertification
