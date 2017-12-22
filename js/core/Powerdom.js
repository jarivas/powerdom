class PD {
    static init() {
        PageManager.init();
        PD.apiUrl = window.config.apiUrl;
    }

    static find(selector, element) {
        element = (typeof element == 'undefined') ? document : element;
        return element.querySelector(selector);
    }

    static findAll(selector, element) {
        element = (typeof element == 'undefined') ? document : element;
        return element.querySelectorAll(selector);
    }

    static getById(id) {
        return document.getElementById(id);
    }

    static requestJson(data, callback, errorCb) {
        fetch(PD.apiUrl, {
            method: 'post',
            body: data ? JSON.stringify(data) : null;
        })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(() => errorCb(this));
  }
}

PD.init();
