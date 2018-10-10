class FilterRows extends PartialTemplate{    
    setUp(){        
        FilterRows.prototype.changeEvent = this.changedEvent;
    }

    static change(e) {
        const el = FilterRows.getActionable(this.dataset.target);
        el.setData('badge', this.value);

        PD.fire(FilterRows.prototype.changeEvent);
    }

    static getValue() {
        return parseInt(FilterRows.prototype.rowsRange.getValue());
    }
}