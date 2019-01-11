class DatePickerComponent extends ComponentTemplate {
    setUp() {
        const templateNode = this.templateNode;
        const text = PD.find('input[type="text"]', templateNode);
        const date = PD.find('input[type="date"]', templateNode);

        this.parent = PD(text.parentNode);
        this.textField = PD(text);
        this.dateField = PD(date);
        this.label = PD('label', templateNode);
    }

    bind() {
        this.textField.listen('click', this.click.bind(this));
        this.dateField.listen('change', this.change.bind(this));
    }

    click() {
        const value = this.textField.getValue().split('.');

        this.dateField.setValue(`${value[2]}-${value[1]}-${value[0]}`);
        this.dateField.removeClass('hidden');
        this.textField.addClass('hidden');
    }

    change() {
        if(this.dateField.getValue() != ''){
            const value = this.dateField.getValue().split('-');

            this.textField.setValue(`${value[2]}.${value[1]}.${value[0]}`);
            this.focusOut();
            
            PD.fire(this.changed);
        } else {
            this.focusOut();
        }
    }

    focusOut() {
        this.dateField.addClass('hidden');
        this.textField.removeClass('hidden');
        setTimeout (() => {this.parent.addClass('is-focused');}, 200);
    }

    init(id, date, label) {
        this.id = id;
        this.textField.setAttribute('id', `${id}-text`);
        this.textField.setValue(date);

        date = date.split('.');
        this.dateField.setValue(`${date[2]}-${date[1]}-${date[0]}`);
        this.dateField.setAttribute('id', `${id}-date`);

        this.label.setAttribute('for', `${id}-date`).setContent(label);
    }

    getValue() {
        return this.dateField.getValue();
    }

    setError() {
        this.parent.addClass('is-invalid');
    }

    removeError() {
        this.parent.removeClass('is-invalid');
    }

}