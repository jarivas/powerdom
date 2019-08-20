class TableBuilderSkill extends PD.Template {
    getHeaders() {
        this.controller = 'skill'
        return ['Name', 'Percentage']
    }

    getRows() {
        return PD.Modules.TableBuilderHelper.getRows(this.controller, this.getHeaders())
    }

    async process() {
        this.form = PD.Modules.TableBuilderHelper.getForm(this.getHeaders())
    }

    edit(e) {
        PD.Modules.TableBuilderHelper.edit(e, this.form)
    }

    showDelete(e) {
        PD.Modules.TableBuilderHelper.showDelete(e, this.delete.bind(this))
    }

    delete(id) {
        PD.Modules.TableBuilderHelper.delete(this.controller, id)
    }
}

export default TableBuilderSkill
