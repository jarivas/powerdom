class Login extends PD.Template {
    async process(){
        if(PD.Config.get('dev')) {
            this._.username.setValue('jose')
            this._.password.setValue('p4ssw0rt')
        }

        PD.Importer.importModule('js/modules/TableBuilderHelper.js')
            .then(TableBuilderHelper => PD.Modules.TableBuilderHelper = TableBuilderHelper)

        PD.Importer.importModule('js/modules/FormBuilderHelper.js')
            .then(FormBuilderHelper => PD.Modules.FormBuilderHelper = FormBuilderHelper)

        return PD.Importer.importModule('js/modules/Auth.js').then(Auth => {
            PD.Modules.Auth = new Auth()
        })
    }

    listenEnter(e) {
        if (e.key.toUpperCase() == 'ENTER') {
            this.send()
        }
    }

    send() {
        const u = this._.username.getValue()
        const p = this._.password.getValue()

        if (u != '' && p != '') {
            PD.Modules.Auth.login(u, p).then(this.afterLogin)
        }
    }

    afterLogin(result) {
        if(result) {
            PD.Pages.go('home')
        }
    }
}

export default Login
