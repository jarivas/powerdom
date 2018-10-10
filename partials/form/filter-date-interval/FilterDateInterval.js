class FilterDateInterval extends PartialTemplate {
    setUp() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        FilterDateInterval.prototype.date_from.setValue(`01.01.${date.getFullYear()}`);
        FilterDateInterval.prototype.date_to.setValue(`${day}.${month}.${date.getFullYear()}`);

        FilterDateInterval.prototype.rangeEnd.setValue(month);

        FilterDateInterval.prototype.changeEvent = this.changedEvent;
    }
    
    static validateKey(e) {
        let key = e.which || e.keyCode;
        const isSystem = ((key >= 37 && key <= 40) || (key == 8) || (key == 9) || (key == 13) || (key == 27) || (key == 46) || (key == 190));
        const isNumber = ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));

        if (!isSystem && !isNumber) {
            e.preventDefault();
            this.dataset.prevented = true;
        }
    }

    static validateDates(e) {
        if (!this.dataset.hasOwnProperty('prevented')) {
            if ((this.maxLength != this.value.length) || (!FilterDateInterval.checkDates())) {
                PD(this.parentNode).addClass('is-invalid');
                e.preventDefault();
            } else {
                PD(this.parentNode).removeClass('is-invalid');
            }
        } else {
            e.preventDefault();
            delete this.dataset.prevented;
        }
    }

    static changeDate(e) {
        const el = FilterDateInterval.getActionable(this.dataset.target);
        let currentDate = el.getValue().split('.');
        let newValue = this.value;

        newValue = (parseInt(this.value) < 10) ? '0' + newValue : newValue;

        switch (FilterDateInterval.prototype.rangeInterval.getValue()) {
            case "0": newValue = `${currentDate[0]}.${currentDate[1]}.${newValue}`; break;
            case "1": newValue = `${currentDate[0]}.${newValue}.${currentDate[2]}`; break;
            case "2": newValue = `${newValue}.${currentDate[1]}.${currentDate[2]}`; break;
        }

        el.setValue(newValue);
        el.fire('keyup').fire('change');
    }

    static getDateFormatted(input) {
        let date = input.getValue();
        date = date.split('.');

        return `${date[2]}-${date[1]}-${date[0]}`;
    }

    static checkDates() {
        let dateFrom = Date.parse(FilterDateInterval.getDateFormatted(FilterDateInterval.prototype.date_from));
        let dateTo = Date.parse(FilterDateInterval.getDateFormatted(FilterDateInterval.prototype.date_to));

        return (dateTo > dateFrom);
    }

    static updateInterval() {
        FilterDateInterval.updateIntervalText();
        FilterDateInterval.updateIntervalRanges();
    }

    static updateIntervalText() {
        let text = '';

        switch (FilterDateInterval.prototype.rangeInterval.getValue()) {
            case "0": text = 'Year'; break;
            case "1": text = 'Month'; break;
            case "2": text = 'Day'; break;
        }

        FilterDateInterval.prototype.textInterval.setValue(text);
    }

    static updateIntervalRanges() {
        const [min, max, startValue, endValue] = FilterDateInterval.updateIntervalRangesHelper();

        FilterDateInterval.prototype.rangeStart
            .setProperty('min', min)
            .setProperty('max', max)
            .setValue(startValue);

        FilterDateInterval.prototype.rangeEnd
            .setProperty('min', min)
            .setProperty('max', max)
            .setValue(endValue);
    }

    static updateIntervalRangesHelper() {
        const dateFromParts = FilterDateInterval.prototype.date_from.getValue().split('.');
        const dateToParts = FilterDateInterval.prototype.date_to.getValue().split('.');
        let currentYear = (new Date()).getFullYear();

        let result = [];

        switch (FilterDateInterval.prototype.rangeInterval.getValue()) {
            case "0": result = [currentYear - 10, currentYear, dateFromParts[2], dateToParts[2]]; break;
            case "1": result = [1, 12, dateFromParts[1], dateToParts[1]]; break;
            case "2": result = [1, 31, dateFromParts[0], dateToParts[0]]; break;
        }

        return result;
    }

    static getValues() {
        return {
            dateFrom: FilterDateInterval.getDateFormatted(FilterDateInterval.prototype.date_from),
            dateTo: FilterDateInterval.getDateFormatted(FilterDateInterval.prototype.date_to),
            interval: FilterDateInterval.prototype.textInterval.getValue()
        }
    }
    
    static changeFilters(e) {
        FilterDateInterval.updateInterval();
        
        PD.fire(FilterDateInterval.prototype.changeEvent);
    }
}