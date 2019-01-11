class FilterDateInterval extends PartialTemplate {
    listen(readyFunction) {
        const ready = () => {
            if(FilterDateInterval.prototype.hasOwnProperty('date_from') && FilterDateInterval.prototype.hasOwnProperty('date_to'))
                readyFunction();
        };
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        PD.listen('dtFromLoaded', (e) => {
            const datepicker =  e.detail;
            datepicker.init('date_from', `01.01.${date.getFullYear()}`, 'Date From');
            FilterDateInterval.prototype.date_from = datepicker;
            ready();
        });

        PD.listen('dtToLoaded', (e) => {
            const datepicker =  e.detail;
            datepicker.init('date_to', `${day}.${month}.${date.getFullYear()}`, 'Date To');
            FilterDateInterval.prototype.date_to = datepicker;
            ready();
        });

        return false;
    }

    setUp(){
        PD.listen('dtFromChanged', FilterDateInterval.changeFilters);
        PD.listen('dtToChanged', FilterDateInterval.changeFilters);
    }

    static checkDates() {
        let dateFrom = FilterDateInterval.prototype.date_from.getValue();
        let dateTo = FilterDateInterval.prototype.date_to.getValue();

        console.log('checkDates', dateFrom , dateTo);

        return (dateTo > dateFrom);
    }

    static getValues() {
        return {
            dateFrom: FilterDateInterval.prototype.date_from.getValue(),
            dateTo: FilterDateInterval.prototype.date_to.getValue(),
        }
    }
    
    static changeFilters() {
        if (FilterDateInterval.checkDates()){
            PD.fire(FilterDateInterval.prototype.changed);
            FilterDateInterval.prototype.date_to.removeError();
        } else
            FilterDateInterval.prototype.date_to.setError();
    }
}