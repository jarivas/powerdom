/**
 * The simplified way of getting data and files from the server
 */
class Request {

    /**
     * Set and instance to PD.Request so can be used globally to access the API
     */
    static setConfigUrl() {
        PD.Request = new Request(PD.Config.get('apiUrl'))
    }

    /**
     * It gets whatever as plain text
     * @param {string} url
     */
    static async getRemoteText(url, errorCb) {
        return fetch(url).then(response => response.text()).catch(errorCb)
    }

    /**
     * An universal api rest error handler
     * @param {string|Object} error
     */
    static handleError(error) {
        let message = ''

        if (typeof error == "string")
            message = error
        else if (error.hasOwnProperty('message'))
            message = error.message
        else if (error.hasOwnProperty('error'))
            message = error.error

        console.error(error)
    }

    /**
     * @constructor
     * @param {string} url
     */
    constructor(url) {
        this.url = url
    }

    /**
     * Sends a POST json request
     * @param {string} path
     * @param {Object} data
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async post(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        headers['Content-Type'] = 'application/json'

        return fetch(this.url + path, {
            method: 'post',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Sends a GET request and returns a json
     * @param {string} path
     * @param {Object} params it will be used to find the rows to retrieve
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async get(path, params, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        path += '?'

        for(let [param,value] of Object.entries(params)) {
            path += `${param}=${encodeURIComponent(value)}&`
        }

        return fetch(this.url + path, {
            method: 'get',
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Sends a Put json request
     * @param {string} path
     * @param {Object} it will be used to find the rows to update
     * @param {Object} data fields to update
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async put(path, params, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        path += '?'

        for(let [param,value] of Object.entries(params)) {
            path += `${param}=${encodeURIComponent(value)}&`
        }

        return fetch(this.url + path, {
            method: 'put',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Sends a DELETE json request
     * @param {string} path
     * @param {Object} data it will be used to find the rows to delete
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async delete(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        path += '?'

        for(let [param,value] of Object.entries(data)) {
            path += `${param}=${encodeURIComponent(value)}&`
        }

        return fetch(this.url + path, {
            method: 'delete',
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }
}
export default Request
