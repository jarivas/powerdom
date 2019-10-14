class TableBuilderHelper {
    static getRows(controller, headers) {
        const params = JSON.parse(sessionStorage.getItem('getRows')) || {}
        const foreignKeysColNames = JSON.parse(sessionStorage.getItem('foreignKeysColNames')) || []
        const foreignKeysValues = JSON.parse(sessionStorage.getItem('foreignKeysValues')) || {}

        return PD.Request.get(`${controller}/read`, params, TableBuilderHelper.errorHandler, {token: PD.Auth.token})
            .then(r => {
                if (!r) {
                    return
                }

                const result = []

                if (!Array.isArray(r) || r.length == 0) return result

                r.forEach(row => {
                    let r = ''

                    headers.forEach(col => {

                        if (foreignKeysColNames.includes(col)) {
                            let value = row[col]

                            if (value.includes(',')) {
                                const values = value.split(',')

                                r += '<td>'

                                values.forEach(v => r += foreignKeysValues[col][v] + ', ')

                                r += '</td>'
                            } else {
                                r += `<td>${foreignKeysValues[col][value]}</td>`
                            }
                        } else {
                            row[col] = row[col].replace(' 00:00:00', '')
                            r += `<td>${row[col]}</td>`
                        }
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

    static getForm(headers) {
        const formEl = PD.select('#form-builder')
        const form = {}

        headers.forEach(inputId => form[inputId] = PD.$(`#${inputId}`, formEl))
        form.Id = PD.$('[type="hidden"]', formEl)

        return form
    }

    static edit(e, form) {
        const row = JSON.parse(decodeURIComponent(e.target.dataset.row))

        for (let [id, value] of Object.entries(row)) {
            const input = form[id]

            if (PD.FormBuilderHelper.isSelect(input)) {
                PD.FormBuilderHelper.setSelectedOptions(input, value)
            } else {
                input.setValue(value)
            }
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
            .then(PD.FormBuilderHelper.handleResponse)
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