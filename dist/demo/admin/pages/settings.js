class Settings {
    async process(){
        PD.Request.get('settings/read', {}, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(settings => {
                for(const [key, value] of Object.entries(settings)) {
                    this
                }
            })
    }
    save() {

    }
    getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
    upload(e) {

    }
    saveResume() {

    }
}

export default Settings