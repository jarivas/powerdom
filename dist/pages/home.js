class Home extends PD.Template {
    async process() {
        this.controller = 'personalData'

        return PD.Request.get(`${this.controller}/read`, {}, PD.Request.handleError)
            .then(r => {
                if(typeof r !== "object") return

                for(let[key, input] of Object.entries(this._)) {
                    if(r.hasOwnProperty(key)) {
                        input.setValue(r[key])
                    }
                }
            })
    }

    save(){
        const data = {}

        for(let[key, input] of Object.entries(this._)) {
            const value = input.getValue()

            if(value != '') {
                data[key] = value
            } else if(input.getProperty('required')) {
                return
            }
        }

        PD.Request.post(`${this.controller}/save`, data, PD.Request.handleError, {token: PD.Modules.Auth.token})
            .then(console.log)
    }
}
export default Home
