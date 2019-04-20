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

/**
 * It holds the site configuration
 * {
 *    "title": "Page Title",
 *    "apiUrl": "http://localhost:8080/",
 *    "mainElementSelector": ".page-content",
 *    "layout": "/templates/layout.html",
 *    "pages": {
 *        "default": {
 *            "template": "templates/pages/default.html",
 *            "title": "Default",
 *            "navigation": false,
 *            "auth": false
 *         }
 *     }
 * }
 */
class Config {

    /**
     * It will update the config with the allowed members
     * of the passed object
     * @param {Object} newConfig 
     */
    static set(newConfig) {
        for(let [key, value] of Object.entries(newConfig)){
            if(config.hasOwnProperty(key)){
                config[key] = value
            }
        }
    }

    /**
     * It will get a copy of the current config
     * @returns {Object}
     */
    static get() {
        return Object.assign({}, config)
    }
}

export default Config