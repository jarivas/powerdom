const config = {
    "title": "Docs",
    "apiUrl": "http://localhost:8080/",
    "mainElementSelector": ".page-content",
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

export default Config