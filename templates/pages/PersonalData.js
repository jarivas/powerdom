const savedSuccessfully = (result) => {
    console.log(result);

    PersonalData.prototype.fields
        .removeAttribute('disabled');
    PersonalData.prototype.btn
        .setAttribute('disabled')
        .setContent('Up to date');

    UIHelpers.Loading.close();
}

class PersonalData {
    static init(fields, btn) {
        const personalData = PageHelper.prototype.data.personalData;

        PersonalData.prototype.fields = fields;
        PersonalData.prototype.btn = btn;

        fields.listen('change', PersonalData.markAsEdited)
            .getElements().forEach((node) => node.value = personalData[node.id]);
            
        btn.listen('click', PersonalData.save);
    }

    static markAsEdited() {
        PersonalData.prototype.btn
            .removeAttribute('disabled')
            .setContent('Click to save!');
    }

    static save() {
        let data = {};
        let send = true;

        PersonalData.prototype.fields.getElements().forEach(field => {
            if (field.value.length > 0)
                data[field.id] = field.value;
            else
                send = false;
        });

        if (send){
            PageHelper.prototype.data.personalData = data;

            Request.json('curriculum/set', PageHelper.prototype.data,
                Request.handleError, { AUTH: PageHelper.prototype.token})
                .then(savedSuccessfully);
        }
    }
}

export default PersonalData;