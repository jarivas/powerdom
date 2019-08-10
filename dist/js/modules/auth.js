class Auth {
    /**
     * Tries to log ins in the system using the credentials passed
     * @param username
     * @param password
     * @returns {Promise<boolean>}
     */
    async login(username, password) {
        PD.Loading.show()

        const data = {
            username: username,
            password: password
        }
        return PD.Request.json('auth/login', data, PD.Request.handleError)
            .then(this.handleResponse.bind(this))
    }

    /**
     * Handles server response saving the token when is all ok
     * @param response
     * @returns {boolean}
     */
    handleResponse(response) {
        PD.Loading.close()

        if(!response.hasOwnProperty('success')) {
            PD.Notification.show(response.message)
            return false
        }

        this.token = response.token
        return true
    }

    /**
     * Overwrites the default function in order to work normally
     * @returns {boolean}
     */
    isAuth() {
        return this.hasOwnProperty('token')
    }
}

export default Auth
