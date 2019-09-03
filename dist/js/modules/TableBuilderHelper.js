class TableBuilderHelper {
    static getRows(controller, headers) {
        return PD.Request.get(`${controller}/read`, {}, TableBuilderHelper.errorHandler)
            .then(r => {
                let result = []

                if (!Array.isArray(r) || r.length == 0) return result

                r.forEach(row => {
                    let r = ''

                    headers.forEach(col => {
                        row[col] = row[col].replace(' 00:00:00', '')
                        r += `<td>${row[col]}</td>`
                    })

                    r += `<td><button class="btn solid blue" _listen="click:edit" data-row="${encodeURIComponent(JSON.stringify(row))}">Edit</button>
                            <button class="btn solid red" _listen="click:showDelete" data-id="${row.Id}">Delete</button></td>`

                    result.push(r)
                })

                return result
            })
    }

    static errorHandler(data) {
        console.log(data)
    }

    static getForm(headers){
        const formEl = PD.select('#form-builder')
        const form = {}

        headers.forEach(inputId => form[inputId] = PD.$(`#${inputId}`, formEl))
        form.Id = PD.$('[type="hidden"]', formEl)

        return form
    }

    static edit(e, form) {
        const row = JSON.parse(decodeURIComponent(e.target.dataset.row))

        for (let [id, value] of Object.entries(row)) {
            form[id].setValue(value)
        }
    }

    static showDelete(e, callbackDelete) {
        const id = e.target.dataset.id

        PD.Modal.setContent(`<button class="btn solid red">Delete</button>`, true)
        PD.$('dialog button.red').listen('click', () => callbackDelete(id))
        PD.Modal.show()
    }

    static delete(controller, id) {
        PD.Modal.close()
        PD.Loading.show()
        PD.Request.delete(`${controller}/deleteOne`, {id: id}, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(result => {
                PD.Loading.close()

                if (result === true) return PD.Pages.go(controller)

                console.error(result)
            })
    }
}

export default TableBuilderHelper