class FilterRows extends PartialTemplate{
    static change(e) {
        FilterRows.prototype.badgeRows.setData('badge',FilterRows.prototype.rows.getValue());
        PD.fire(FilterRows.prototype.changed);
    }

    static getValue() {
        return parseInt(FilterRows.prototype.rows.getValue());
    }
}