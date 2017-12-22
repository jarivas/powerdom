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
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    callback(JSON.parse(this.responseText));
                } else {
                    errorCb(this);
                }
            }
        };
        xhr.open("POST", PD.apiUrl, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    }

}

PD.init();