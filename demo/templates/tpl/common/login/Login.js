class Login extends PD.Template {
    send() {
        const isFilled = Object.values(this._).every(input => input.value != '')

        if(isFilled) {
            PD.Loading.show()

            
        } else {
            PD.Notification.show('Not all the fields are filled')
        }
    }

    success(data){
    }
}

export default Login