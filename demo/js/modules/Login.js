class Login extends PD.Template {
    send() {
        const isFilled = Object.values(this._).every(input => input.value != '')

        if(isFilled) {
            PD.Loading.show()

            this.success('t0k3n')
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