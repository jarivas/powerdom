class Login extends PD.Template {
    send() {
        const config = PD.Config.get()
        const isFilled = Object.values(this._).every(input => input.value != '')

        if(isFilled) {
            PD.Loading.show()

            if(config.isDemo) {
                this.success('t0k3n')
            }
        } else {
            PD.Notification.show('Wrong credentials')
        }
    }

    success(data){
        PD.Importer.importModule('/js/modules/PageHelper.js').then((PageHelper) => {
            window.PageHelper = PageHelper
            PageHelper.saveToken(data)
        })
    }
}

export default Login