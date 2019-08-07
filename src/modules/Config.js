const config = {
    title: "Page Title",
    apiUrl: "http://localhost:8080/",
    mainElementSelector: ".page-content",
    pages: {
        default: {
            template: "pages/default.html",
            title: "Default",
            navigation: false,
            auth: false
        }
    },
    tpl: {
        dir: "/tpl/"
    }
}

/**
 * It holds the site configuration
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
     * @param {string} key
     * @returns {Object}
     */
    static get(key) {
        return Object.assign({}, (typeof key != 'undefined') ? config[key] : config)
    }
}

export default Config
