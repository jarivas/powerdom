import Config from './Config.js'

const config = Config.get()
const workers = new Map()

/**
 * The simplified way of getting data and files from the server
 */
class Request {

    /**
     * Sends and receive JSON data to the server, typically use on api rest calls
     * @param {string} path 
     * @param {Object} data 
     * @param {function} errorCb 
     * @param {Object} headers 
     */
    static async json(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        headers['Content-Type'] = 'application/json'

        return fetch(config.apiUrl + path, {
            method: 'post',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Gets a worker to be used in Request.worker
     * @param {string} workerUrl 
     * @param {function} callback 
     * @param {function} errorCb 
     */
    static getWorkerForRquest(workerUrl, callback, errorCb) {
        let worker = null

        if (!workers.has(workerUrl)) {
            worker = new Worker(workerUrl)

            worker.addEventListener('message', callback, false)
            worker.addEventListener('error', errorCb, false)

            workers.set(workerUrl, worker)
        } else {
            worker = workers.get(workerUrl)
        }

        return worker
    }

    /**
     * Its process the result data of the call on a background worker
     * @param {string} path 
     * @param {Object} data 
     * @param {Worker} worker 
     */
    static worker(path, data, worker) {
        fetch(config.apiUrl + path, {
            method: 'post',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => worker.postMessage(data))
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

        Notification.show(message)

        console.error(error)
    }
}
export default Request