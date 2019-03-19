const workers = new Map()

class Request {

    static async json(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {}

        headers['Content-Type'] = 'application/json'

        return fetch(app.config.apiUrl + path, {
            method: 'post',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

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

        return workerUrl
    }

    static worker(path, data, worker) {
        fetch(window.config.apiUrl + path, {
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

    static handleError(error) {
        let message = ''

        if (typeof error == "string")
            message = error
        else if (error.hasOwnProperty('message'))
            message = error.message
        else if (error.hasOwnProperty('error'))
            message = error.error

        app.Notification.show(message)

        console.error(error)
    }
}
export default Request