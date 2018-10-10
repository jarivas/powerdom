class FilterDateInterval extends PartialTemplate {
    setUp() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;
        day = `${date.getFullYear()}-${month}-${day}`;

        FilterDateInterval.prototype.date_from.setValue(`${date.getFullYear()}-01-01`);
        FilterDateInterval.prototype.date_to.setValue(day);

        FilterDateInterval.prototype.changeEvent = this.changedEvent;
    }

    static checkDates() {
        let dateFrom = Date.parse(FilterDateInterval.prototype.date_from.getValue());
        let dateTo = Date.parse(FilterDateInterval.prototype.date_to.getValue());

        return (dateTo > dateFrom);
    }

    static getValues() {
        return {
            dateFrom: FilterDateInterval.prototype.date_from.getValue(),
            dateTo: FilterDateInterval.prototype.date_to.getValue(),
        }
    }
    
    static change(e) {
        if(FilterDateInterval.checkDates())    
            PD.fire(FilterDateInterval.prototype.changeEvent);
    }

    static invalid(e){
        console.log(e);
    }
}