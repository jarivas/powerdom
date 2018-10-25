class AutoCompleteComponent extends ComponentTemplate {
    setUp() {
        const templateNode = this.templateNode;
        const input = PD.find('input', templateNode);

        this.parent = PD(input.parentNode);
        this.textField = PD(input);
        this.input = input;
        this.list = PD.find('datalist', templateNode);
        this.datalist = PD(this.list);
        this.label = PD('label', templateNode);
    }

    bind() {
        this.textField.listen('change', this.change.bind(this));
        this.textField.listen('keydown', this.validateKey.bind(this));
        this.textField.listen('keyup', this.validateContent.bind(this));
    }

    validateKey(e) {
        const key = e.which || e.keyCode;
        const isSystem = ((key == 8) || (key == 9) || (key == 13) || (key == 16) || (key == 17) || (key == 27) || (key >= 37 && key <= 40) || (key == 46));

        if (isSystem)
            e.target.dataset.prevented = true;
    }

    validateContent(e) {
        const element = e.target;

        if (!element.dataset.hasOwnProperty('prevented')) {
            const value = element.value;
            const list = this.list.children;
            const max = list.length;
            const pattern = new RegExp(`^${value}`, 'i');
            let contains = false;
            let i = 0;

            while (i < max) {
                contains = pattern.test(list[i].value);

                if (!contains)
                    ++i;
                else{
                    i = max;
                    contains = true;
                }
            }

            if (!contains) {
                e.preventDefault();
                this.parent.addClass('is-invalid');
            }
        } else {
            e.preventDefault();
            delete element.dataset.prevented;
            this.parent.removeClass('is-invalid');
        }
    }

    /**
     * 
     * @param {string} id
     * @param {string} label
     */
    init(id, label) {
        this.datalist.setAttribute('id', id);
        this.textField.setAttribute('list', id);
        this.label.setAttribute('for', id).setContent(label);

        return this;
    }

    /**
     * value1, value2,...
     * @param {string[]} options 
     */
    addOptions(options) {
        let html = '';

        options.forEach(option => html += `<option value="${option}">`);

        this.datalist.setContent(html);

        return this;
    }

    empty() {
        this.datalist.empty();

        return this;
    }

    getValue() {
        return this.textField.getValue();
    }

    setValue(value) {
        this.textField.setValue(value);

        return this;
    }

    change(e) {
        const value = e.target.value;
        const list = this.list.children;
        const max = list.length;
        let contains = false;
        let i = 0;

        while (i < max) {
            contains = (list[i].value == value);

            if (!contains)
                ++i;
            else {
                i = max;
                contains = true;
            }
        }

        if (contains) {
            PD.fire(this.changed);
            this.parent.removeClass('is-invalid');
        } else {
            this.parent.addClass('is-invalid');
        }
    }
}