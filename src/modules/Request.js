import Config from './Config.js'

/**
 * The simplified way of getting data and files from the server
 */
class Request {

    /**
     * Sends a POST json request
     * @param {string} path
     * @param {Object} data
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    static async post(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        headers['Content-Type'] = 'application/json'

        return fetch(Config.get("apiUrl") + path, {
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
    static async get(path, params, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        path += '?'

        for(let [param,value] of Object.entries(params)) {
            path += `${param}=${encodeURIComponent(value)}&`
        }

        return fetch(Config.get("apiUrl") + path, {
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
    static async put(path, params, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        path += '?'

        for(let [param,value] of Object.entries(params)) {
            path += `${param}=${encodeURIComponent(value)}&`
        }

        return fetch(Config.get("apiUrl") + path, {
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
    static async delete(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        headers['Content-Type'] = 'application/json'

        return fetch(Config.get("apiUrl") + path, {
            method: 'delete',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * It gets whatever as plain text
     * @param {string} url
     */
    static async getRemoteText(url) {
        let text = ''
        try {
            const response = await fetch(url)
            text = await response.text()
        }
        catch (err) {
            console.log('fetch failed', err)
        }

        return text
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

        PD.Notification.show(message)

        console.error(error)
    }
}
export default Request
