const config = {
    "title": "Docs",
    "meta": [
        "charset='utf-8'",
        "content='IE=edge' http-equiv='X-UA-Compatible'",
        "name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'"
    ],
    "apiUrl": "http://localhost:8080/",
    "mainElementSelector": ".page-content",
    "css": [
        "/css/style.css"
    ],
    "js": [],
    "layout": "/templates/layout.html",
    "pages": {
        "default": {
            "template": "templates/pages/default.html",
            "title": "Documentation",
            "navigation": false,
            "auth": false
        }
    }
}

class Config {
    static set(obj) {
        for(let [key, value] of Object.entries(obj)){
            if(config.hasOwnproperty(key)){
                config[key] = value
            }
        }
    }

    static get() {
        return config
    }
}