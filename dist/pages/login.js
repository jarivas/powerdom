class Login {
    async process(){
        if(PD.Config.get('dev')) {
            this._.username.setValue('jose')
            this._.password.setValue('p4ssw0rt')
        }

        import('/js/modules/TableBuilderHelper.js')
            .then(module => PD.Modules.TableBuilderHelper = module.default)

        import('/js/modules/FormBuilderHelper.js')
            .then(module => PD.Modules.FormBuilderHelper = module.default)

        return import('/js/modules/Auth.js').then(module => {
            PD.Modules.Auth = new module.default()
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
            PD.Page.go('home')
        }
    }
}

export default Login
