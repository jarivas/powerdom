const Request = app.Request
const Loading = app.Loading

class Login {

    constructor(){
        this.username = ''
        this.password = ''
    }

    send() {
        const data = {
            username: app.login.username,
            password: app.login.password
        }

        if(data.username.length > 0 && data.password.length > 0){
            Loading.show()
            Request.json('curriculum/login', data, Request.handleError)
                .then(Login.handleToken)
        }
    }

    static handleToken(response){
        Loading.close()

        if(response.hasOwnProperty('success') && response.success){
            app.PageHelper.prototype.token = response.token
            app.PageHelper.go('home')
        } else {
            throw response.message
        }
    }
}

export default Login