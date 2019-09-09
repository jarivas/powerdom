class TableBuilderHelper {
    static getRows(controller, headers) {
        const params = JSON.parse(sessionStorage.getItem('getRows')) || {}

        return PD.Request.get(`${controller}/read`, params, TableBuilderHelper.errorHandler)
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

                    result.push(`<tr>${r}</tr>`)
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
        PD.Modal.setContent(`<div class="center">This action can not be undone <button class="btn solid red">Delete</button></div>`, true)
        PD.$('pd-modal button.red').listen('click', () => callbackDelete(e.target.dataset.id))
        PD.Modal.show()
    }

    static delete(element, id) {
        const controller = element.controller

        PD.Modal.close()
        PD.Loading.show()
        PD.Request.delete(`${controller}/deleteOne`, {id: id}, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(result => {
                PD.Loading.close()

                if (result === true) {
                    PD.select('#form-builder > input[type="hidden"]').value = ''

                    return TableBuilderHelper.refresh()
                }

                console.error(result)
            })
    }

    static refresh() {
        const table = PD.select('pd-tpl#table')

        table.refresh()
    }

    static search(element) {
        const searchText = element._.search.getValue()
        const limit = parseInt(element._.limit.getValue())
        const page = parseInt(element._.page.getValue())
        const offset = (page > 1) ? limit * page : 0

        sessionStorage.setItem('getRows', JSON.stringify({search: searchText, limit: limit, offset: offset}))

        TableBuilderHelper.refresh()
    }
}

export default TableBuilderHelper