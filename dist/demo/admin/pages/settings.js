class Settings {
    async process(){
        const imageKeys = ['LeadBg', 'Favicon']
        PD.Request.get('settings/read', {}, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(settings => {
                for(const [key, value] of Object.entries(settings)) {
                    if (imageKeys.includes(key)) {
                        this._[key].setProperty('src', PD.Config.get('apiUrl') + value)
                    } else {
                        this._[key].setValue(value)
                    }
                }
            })
    }

    save(e) {
        const data = {}

        PD.Loading.show()

        PD.selectAll('input[type=color]').forEach(input => {
            data[input.dataset.col] = input.value
        })

        PD.Request.post('settings/save', data, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(r => {
                PD.Loading.close()
                PD.Page.go('settings')
            })
    }

    async getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const r = reader.result
                const result = r.split(',')

                resolve(result[1])
            }
            reader.onerror = error => reject(error)
        })
    }

    upload(e) {
        const name = e.target.dataset.input
        const file_name = e.target.dataset.name
        const files = this._[name].getFiles()

        if (files.length === 0) return

        this.getBase64(files[0]).then(img => {
            const data = {
                name,
                file_name,
                img
            }

            PD.Request.post('settings/upload', data, PD.RequestHelper.handleError, {token: PD.Auth.token})
                .then(r => {
                    PD.Loading.close()
                    PD.Page.go('settings')
                })
        })
    }

    saveResume() {
        const data = {
            "resume": this._.Resume.getValue()
        }

        PD.Request.post('settings/save', data, PD.RequestHelper.handleError, {token: PD.Auth.token})
            .then(r => {
                PD.Loading.close()
                PD.Page.go('settings')
            })
    }
}

export default Settings