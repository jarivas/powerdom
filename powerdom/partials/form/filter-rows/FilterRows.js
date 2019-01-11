class FilterRows extends PartialTemplate {
    static validateKey(e) {
        let key = e.which || e.keyCode;
        const isSystem = ((key >= 37 && key <= 40) || (key == 8) || (key == 9) || (key == 13) || (key == 27) || (key == 46));
        const isNumber = ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));

        if (!isSystem && !isNumber) {
            e.preventDefault();
            this.dataset.prevented = true;
        }
    }

    static validateValue(e) {
        const value = parseInt(this.value);

        if (!this.dataset.hasOwnProperty('prevented')) {
            if (!Number.isInteger(value)) {
                e.preventDefault();
                PD(this.parentNode).addClass('is-invalid');
            } else {
                FilterRows.prototype.badgeRows.setData('badge', this.value);

                PD(this.parentNode).removeClass('is-invalid');

                PD.fire(FilterRows.prototype.changed);
            }
        } else {
            e.preventDefault();
            delete this.dataset.prevented;
        }
    }

    static change(e) {
        FilterRows.prototype.badgeRows.setData('badge', this.value);
        FilterRows.prototype.rowsInput.setValue(this.value);

        PD.fire(FilterRows.prototype.changed);
    }

    static getValue() {
        return parseInt(FilterRows.prototype.rowsInput.getValue());
    }
}