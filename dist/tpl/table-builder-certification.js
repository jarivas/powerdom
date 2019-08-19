class TableBuilderCertification extends PD.Template {
    getHeaders() {
        this.controller = 'certification'
        return ['Name', 'Authority', 'Date']
    }

    getRows() {
        return PD.Request.get(`${this.controller}/read`, {}, this.errorHandler, {token: PD.Modules.Auth.token})
            .then(r => {
                let result = []

                if(!Array.isArray(r) || r.length == 0) return result

                r.forEach(row => {
                    row.Date = row.Date.replace(' 00:00:00', '')
                    const r = `<td>${row.Name}</td><td>${row.Authority}</td><td>${row.Date}</td>
                            <td><button class="btn solid blue" _listen="click:edit" data-row="${encodeURIComponent(JSON.stringify(row))}">Edit</button>
                            <button class="btn solid red" _listen="click:showDelete" data-id="${row.Id}">Delete</button></td>`

                    result.push(r)
                })

                return result
            })
    }

    errorHandler(data){
        console.log(data)
    }

    async process(){
        const formEl = PD.select('#form-builder')
        this.form = {}

        this.getHeaders().forEach(inputId => this.form[inputId] = PD.$(`#${inputId}`, formEl))
        this.form.Id = PD.$('[type="hidden"]', formEl)
    }

    edit(e) {
        const row = JSON.parse(decodeURIComponent(e.target.dataset.row))

        for(let[id, value] of Object.entries(row)){
            this.form[id].setValue(value)
        }
    }

    showDelete(e) {
        const id = e.target.dataset.id

        PD.Modal.setContent(`<button class="btn solid red">Delete</button>`, true)
        PD.$('dialog button.red').listen('click', () => this.delete(id))
        PD.Modal.show()
    }

    delete(id){
        PD.Modal.close()
        PD.Loading.show()
        PD.Request.delete(`${this.controller}/deleteOne`, {id: id}, PD.Request.handleError, {token: PD.Modules.Auth.token})
            .then(result => {
                PD.Loading.close()

                if(result === true) return PD.Pages.go(this.controller)

                console.error(result)
            })
    }
}

export default TableBuilderCertification
