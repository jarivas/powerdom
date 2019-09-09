class TableBuilderPost {
    getHeaders() {
        this.controller = 'post'
        return ['Title', 'Body', 'Tags']
    }

    getRows() {
        return PD.TableBuilderHelper.getRows(this.controller, this.getHeaders())
    }

    async process() {
        const params = JSON.parse(sessionStorage.getItem('getRows')) || {}

        this.form = PD.TableBuilderHelper.getForm(this.getHeaders())

        if(params.hasOwnProperty('search')){
            this._.search.setValue(params.search)
            sessionStorage.removeItem('getRows')
        }

    }

    edit(e) {
        PD.TableBuilderHelper.edit(e, this.form)
    }

    showDelete(e) {
        PD.TableBuilderHelper.showDelete(e, this.delete.bind(this))
    }

    delete(id) {
        PD.TableBuilderHelper.delete(this, id)
    }

    search() {
        PD.TableBuilderHelper.search(this)
    }

    refresh() {
        PD.TableBuilderHelper.refresh()
    }
}

export default TableBuilderPost
