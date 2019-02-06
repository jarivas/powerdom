class PersonalData {
    static init(fields, btn) {
        PersonalData.prototype.fields = fields;
        PersonalData.prototype.btn = btn;

        fields.listen('change', PersonalData.markAsEdited);
        btn.listen('click', PersonalData.save);
    }

    static markAsEdited() {
        PersonalData.prototype.btn
            .removeAttribute('disabled')
            .setContent('Click to save!');
    }

    static save() {
        const data = {};
        let send = true;

        PersonalData.prototype.fields.getElements().forEach(field => {
            if (field.value.length > 0)
                data[field.id] = field.value;
            else
                send = false;
        });

        if (send)
            Request.json('curriculum/set', data, PersonalData.savedSuccessfully, Request.handleError, { AUTH: window.token });
    }

    static savedSuccessfully(result) {
        console.log(result);

        PersonalData.prototype.fields
            .removeAttribute('disabled');
        PersonalData.prototype.btn
            .adAttribute('disabled')
            .setContent('Up to date');

        window.UIHelpers.Loading.close();
    }
}

export default PersonalData;