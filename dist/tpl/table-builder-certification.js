class TableBuilderCertification extends PD.Template {
    getHeaders() {
        return ['Name', 'Authority', 'Date']
    }

    getRows() {
        return PD.Request.get('certification/read', {}, this.errorHandler, {token: PD.Modules.Auth.token})
            .then(r => {
                let result = []

                if(!Array.isArray(r) || r.length == 0) return result

                r.forEach(row => result.push(`<td>${row.Name}</td><td>${row.Authority}</td><td>${row.Date}</td>
<td><button class="btn solid blue" _listen="click:edit" data-id="${row.Id}">Edit</button><button class="btn solid red" _listen="click:delete" data-id="${row.ID}">Delete</button></td>`))

                return result
            })
    }

    errorHandler(data){
        console.log(data)
    }

    async process(){
        const form = PD.$('.full-width-forms')
        console.log(form)
        /*@TODO: use headers to _ form inputs*/
    }

    edit() {

    }

    delete() {

    }
}

export default TableBuilderCertification
