class Login {
    static init() {
        const form = select('div.full-width-forms');

        Login.prototype.inputs = selectAll('input', form);

        if( window.config.hasOwnProperty('defaultLogin') ){
            const defaultValues = window.config.defaultLogin;
            Login.prototype.inputs.forEach(input => input.value = defaultValues[input.id]);
        }

        PD('button').listen('click', Login.click);
    }

    static click() {
        const data = {};
        let send = true;
        
        Login.prototype.inputs.forEach(input => {
            if (input.value.length > 0)
                data[input.id] = input.value;
            else
                send = false;
        });

        if(send)
            Request.json('curriculum/login', data, Request.handleError)
                .then(Login.handleToken)
    }

    static handleToken(response){
        if(response.hasOwnProperty('success') && response.success){
            PageHelper.prototype.token= response.token;
            PageHelper.changePage('home');
        } else {
            throw response.message;
        }
    }
}

export default Login;