class Login {
    static init() {
        const form = select('div.full-width-forms');
        const defaultValues = window.config.defaultLogin;

        Login.prototype.inputs = selectAll('input', form);

        Login.prototype.inputs.forEach(input => input.value = defaultValues[input.id]);

        PD('button', form).listen('click', Login.click);
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
            Request.json('curriculum/login', data, Login.handleToken, Request.handleError)
    }

    static handleToken(response){
        if(response.hasOwnProperty('success') && response.success){
            window.token = response.token;
            window.UIHelpers.Page.changePage('home');
        } else {
            throw response.message;
        }
    }
}

export default Login;