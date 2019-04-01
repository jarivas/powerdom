const config = {
    "title": "Page Title",
    "apiUrl": "http://localhost:8080/",
    "mainElementSelector": ".page-content",
    "layout": "/templates/layout.html",
    "pages": {
        "default": {
            "template": "templates/pages/default.html",
            "title": "Default",
            "navigation": false,
            "auth": false
        }
    }
}

class Config {
    static set(obj) {
        for(let [key, value] of Object.entries(obj)){
            if(config.hasOwnProperty(key)){
                config[key] = value
            }
        }
    }

    static get() {
        return config
    }
}

export default Config