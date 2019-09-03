class TableBuilderEducation {
    getHeaders() {
        this.controller = 'education'
        return ['Notes', 'SchoolName', 'StartDate', 'EndDate']
    }

    getRows() {
        return PD.TableBuilderHelper.getRows(this.controller, this.getHeaders())
    }

    async process() {
        this.form = PD.TableBuilderHelper.getForm(this.getHeaders())
    }

    edit(e) {
        PD.TableBuilderHelper.edit(e, this.form)
    }

    showDelete(e) {
        PD.TableBuilderHelper.showDelete(e, this.delete.bind(this))
    }

    delete(id) {
        PD.TableBuilderHelper.delete(this.controller, id)
    }
}

export default TableBuilderEducation
