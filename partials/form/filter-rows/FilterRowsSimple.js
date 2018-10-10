class FilterRows extends PartialTemplate{    
    setUp(){        
        FilterRows.prototype.changeEvent = this.changedEvent;
    }

    static change(e) {
        PD.fire(FilterRows.prototype.changeEvent);
    }

    static getValue() {
        return parseInt(FilterRows.prototype.rows.getValue());
    }
}