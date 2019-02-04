class Request {

    static json(path, data, callback, errorCb) {
        const headers = {
            'Content-Type': 'application/json'
        };

        fetch(window.config.apiUrl + path, {
            method: 'post',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .then(callback)
            .catch(errorCb);
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
            .catch(errorCb);
    }

    static getWorker(workerUrl) {
        const workers = Request.getWorkers();
        let worker = null;

        if (!workers.has(workerUrl)) {
            worker = new Worker(workerUrl);

            worker.addEventListener('message', callback, false);
            worker.addEventListener('error', errorCb, false);

            workers.set(workerUrl, worker);
        } else {
            worker = workers.get(workerUrl);
        }

        return workerUrl;
    }

    static getWorkers() {
        if (!Request.prototype.hasOwnProperty('workers'))
            Request.prototype.workers = new Map();

        return Request.prototype.workers;
    }

    static async getRemoteText(url) {
        let text = '';
        try {
            const response = await fetch(url);
            text = await response.text();
        }
        catch (err) {
            console.log('fetch failed', err);
        }
        
        return text;
    }

    static loadCSS(url) {
        const head = document.head;
        const css = document.createElement('link');
        let cssAdded = false;

        css.href = url;
        css.type = 'text/css';
        css.rel = 'stylesheet';

        css.onload = css.onreadystatechange = function () {
            if (!cssAdded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                cssAdded = true;
                css.onload = css.onreadystatechange = null;
            }
        };

        head.appendElement(css);
    }
}
export default Request;