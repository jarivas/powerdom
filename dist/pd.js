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
    dev: true
};

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
                config[key] = value;
            }
        }
    }

    /**
     * It will get  the current config
     * @param {string} key
     * @returns {Object}
     */
    static get(key) {
        if(typeof key == 'undefined') return config
        if(config.hasOwnProperty(key)) return config[key]
        return null
    }
}

/**
 * The simplified way of getting data and files from the server
 */
class Request {

    /**
     * @constructor
     * @param {string} url
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Sends a POST json request
     * @param {string} path
     * @param {Object} data
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async post(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {};

        headers['Content-Type'] = 'application/json';

        return fetch(this.url + path, {
            method: 'post',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Sends a GET request and returns a json
     * @param {string} path
     * @param {Object} params it will be used to find the rows to retrieve
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async get(path, params, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {};

        path += '?';

        for(let [param,value] of Object.entries(params)) {
            path += `${param}=${encodeURIComponent(value)}&`;
        }

        return fetch(this.url + path, {
            method: 'get',
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Sends a Put json request
     * @param {string} path
     * @param {Object} it will be used to find the rows to update
     * @param {Object} data fields to update
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async put(path, params, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {};

        path += '?';

        for(let [param,value] of Object.entries(params)) {
            path += `${param}=${encodeURIComponent(value)}&`;
        }

        return fetch(this.url + path, {
            method: 'put',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * Sends a DELETE json request
     * @param {string} path
     * @param {Object} data it will be used to find the rows to delete
     * @param {function} errorCb
     * @param {Object} [headers]
     */
    async delete(path, data, errorCb, headers) {
        if(typeof headers == 'undefined')
            headers = {};

        headers['Content-Type'] = 'application/json';

        return fetch(this.url + path, {
            method: 'delete',
            body: data ? JSON.stringify(data) : null,
            mode: 'cors',
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .catch(errorCb)
    }

    /**
     * It gets whatever as plain text
     * @param {string} url
     */
    static async getRemoteText(url, errorCb) {
        return fetch(url).then(response => response.text()).catch(errorCb)
    }

    /**
     * An universal api rest error handler
     * @param {string|Object} error
     */
    static handleError(error) {
        let message = '';

        if (typeof error == "string")
            message = error;
        else if (error.hasOwnProperty('message'))
            message = error.message;
        else if (error.hasOwnProperty('error'))
            message = error.error;

        console.error(error);
    }
}

const ELEMENT_NODE = Node.ELEMENT_NODE;

const helper = {
    POSITION_BEFORE_BEGIN: 'beforebegin',
    POSITION_AFTER_BEGIN: 'afterbegin',
    POSITION_BEFORE_END: 'beforeend',
    POSITION_AFTER_END: 'afterend',
    insertAdjacent: function(element, position, html) {
        if (typeof html == 'string') {
            element.insertAdjacentHTML(position, html);
        } else if (html instanceof NodeList) {
            html.forEach(n => {
                if (n.nodeType === ELEMENT_NODE)
                    element.insertAdjacentElement(position, n);
            });
        } else {
            element.insertAdjacentElement(position, html);
        }
    }
};


class PowerDom {

    /**
     * A shortcut to instantiate 
     * @param {string|Document|DocumentFragment|Element} selector
     * @param {Document|DocumentFragment|Element} [element]
     * @returns {PowerDom}
     */
    static $(selector, element) {
        return (typeof selector == 'string') ?
            PowerDom.getInstanceBySelector(selector, element) :
            PowerDom.getInstanceByElement(selector)
    }

    /**
     * @param {string} selector one or more comma separated
     * @param {Document|DocumentFragment|Element} [element]
     * @returns {PowerDom}
     */
    static getInstanceBySelector(selector, element) {
        let elements = null;

        if (typeof element == 'undefined')
            element = document;

        elements = element.querySelectorAll(selector);

        if (!elements)
            throw 'No elements selected'

        return new PowerDom(elements)
    }

    /**
     * @param {Document|DocumentFragment|Element} [element]
     * @returns {PowerDom}
     */
    static getInstanceByElement(element) {
        return new PowerDom([element])
    }

    /**
     * 
     * @param {Element[]|NodeList} elements 
     */
    constructor(elements) {
        this.elements = elements;
    }

    /**
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    setContent(html) {
        this.elements.forEach(element => {

            while (element.hasChildNodes())
                element.removeChild(element.lastChild);

            helper.insertAdjacent(element, helper.POSITION_BEFORE_END, html);
        });

        return this
    }

    /**
     * Return a string or strings with the contents 
     * @returns {string|string[]}
     */
    getContent() {
        const content = [];

        this.elements.forEach(element => content.push(element.innerHTML));

        return (content.length > 1) ? content : content[0]
    }

    /**
     * Set the property value
     * @param {string|number} value 
     * @returns {PowerDom} this
     */
    setValue(value) {
        this.elements.forEach(element => element.value = value);

        return this
    }

    /**
     * Get the value or values
     * @returns {string|number|{string|number}[]}
     */
    getValue() {
        const values = [];

        this.elements.forEach(element => values.push(element.value));

        return (values.length > 1) ? values : values[0]
    }

    /**
     * Replace element(s) with a html string
     * @param {string|Document|DocumentFragment|Element} html 
     */
    replace(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_BEFORE_BEGIN, html);

            element.parentElement.removeChild(element);
        });
    }

    /**
     * Inserts the resulting nodes into the DOM tree inside the element, before its first child.
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    prepend(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_AFTER_BEGIN, html);
        });

        return this
    }

    /**
     * Inserts the resulting nodes into the DOM tree inside the element, after its last child.
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    append(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_BEFORE_END, html);
        });
        return this
    }

    /**
     * Inserts the resulting nodes into the DOM tree before the element itself
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    insertBefore(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_BEFORE_BEGIN, html);
        });

        return this
    }

    /**
     * Inserts the resulting nodes into the DOM tree after the element itself
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    insertAfter(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_AFTER_END, html);
        });

        return this
    }

    /**
     * Returns an string or string[] with the copies  
     * @returns {string|string[]}
     */
    getHtml() {
        const clones = [];

        this.elements.forEach(element => clones.push(element.outerHTML));

        return (clones.length > 1) ? clones : clones[0]
    }

    /**
     * Clean the inside of the element(s)
     */
    empty() {
        this.elements.forEach(element => {
            while (element.hasChildNodes())
                element.removeChild(element.lastChild);

            element.remove();
        });
    }

    /**
     * Removes all the elements
     */
    remove() {
        this.elements.forEach(element => {
            while (element.hasChildNodes())
                element.removeChild(element.lastChild);

            if(element.parentElement)
                element.parentElement.removeChild(element);
        });
    }

    /**
     * Sets up a function that will be called whenever the specified event is delivered to the target
     * @param {string} event
     * @param {EventListener} callback
     * @returns {PowerDom} this
     */
    listen(event, callback) {
        this.elements.forEach(element => element.addEventListener(event, callback));

        return this
    }

    /**
     * Invokes the function previous set for this event
     * @param {string} event 
     */
    fire(event) {
        this.elements.forEach(element => element.dispatchEvent(new CustomEvent(event)));

        return this
    }

    /**
     * Removes the event listener previously registered
     * @param {string} event
     * @param {EventListener} callback
     * @returns {PowerDom} this
     */
    mute(event, callback) {
        this.elements.forEach(element => element.removeEventListener(event, callback));

        return this
    }

    /**
     * Add specified class values. If these classes already exist in attribute of the element,
     * then they are ignored.
     * @param {string} cssClass 
     */
    addClass(cssClass) {
        this.elements.forEach(element => element.classList.add(cssClass));

        return this
    }

    /**
     * Remove specified class values. Removing a class that does not exist does NOT throw an error.
     * @param {string} cssClass 
     */
    removeClass(cssClass) {
        this.elements.forEach(element => element.classList.remove(cssClass));

        return this
    }

    removeAllClasses() {
        this.elements.forEach(element => {
            const list = element.classList;
            list.forEach(css => list.remove(css));
        });

        return this
    }

    /**
     * If the class is present will be removed and viceversa
     * @param {string} cssClass 
     */
    toggleClass(cssClass) {
        this.elements.forEach(element => element.classList.toggle(cssClass));

        return this
    }

    /**
     * Sets an attribute with its value
     * @param {string} index 
     * @param {string} value 
     * @returns {PowerDom} this
     */
    setAttribute(index, value) {
        this.elements.forEach(element => element.setAttribute(index, value));

        return this
    }

    /**
     * removes an attribute
     * @param {string} index 
     * @returns {PowerDom} this
     */
    removeAttribute(index) {
        this.elements.forEach(element => element.removeAttribute(index));

        return this
    }

    /**
     * Gets the value or values of the property
     * @param {string} index
     * @returns {string|string[]}
     */
    getProperty(index) {
        const values = [];

        this.elements.forEach(element => values.push(element[index]));

        return (values.length > 1) ? values : values[0]
    }

    /**
     * Removes a property in case you need it
     * @param {string} index
     * @returns {PowerDom} this
     */
    removeProperty(index) {
        this.elements.forEach(element => delete element[index]);

        return this
    }

    /**
     * Sets a new member on the elements dataset
     * @param {string} index 
     * @param {string} value 
     * @returns {PowerDom} this
     */
    setData(index, value) {
        this.elements.forEach(element => element.dataset[index] = value);

        return this
    }

    /**
     * Get the value or values
     * @param {string} index 
     * @returns {string|string[]}
     */
    getData(index) {
        const data = [];

        this.elements.forEach(element => data.push(element.dataset[index]));

        return (data.length > 1) ? data : data[0]
    }

    /**
     * Get the reference or references to the contained nodes
     */
    getElements() {
        const elements = this.elements;

        return (elements.length > 1) ? elements : elements[0]
    }

    select(selector) {
        const data = [];

        this.elements.forEach(element => {
            const node = select(selector, element);

            if(node)
                data.push(node);
        });

        return (data.length > 1) ? data : data[0]
    }
    
    selectAll(selector) {
        let data = [];

        this.elements.forEach(element => {
            const nodeList = selectAll(selector, element);
            
            if(nodeList.length > 0)
                data = data.concat(nodeList);
        });

        return (data.length > 1) ? data : data[0]
    }
}

/**
 * Returns the first Element within the document that matches the specified selector,
 * or group of selectors. If no matches are found, null is returned.
 * @param {string} selector one or more comma separated
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {Element|Node}
 */
function select(selector, element) {
    element = (typeof element == 'undefined') ? document : element;
    return element.querySelector(selector)
}

/**
 * Returns a static (not live) NodeList representing a list of the document's element
 *  that match the specified group of selectors.
 * @param {string} selector one or more comma separated
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {Element[]|NodeList}
 */
function selectAll(selector, element) {
    element = (typeof element == 'undefined') ? document : element;
    return element.querySelectorAll(selector)
}
/**
 * @callback errorCallback
 * @param {object} error
 *
 * @callback EventListener
 * @param {object} event
 */

function loopHelper(item, index, tpl) {
    return eval('`' + tpl + '`')
}

class Template {
    static replace(element){
        const template = select('template', element);
        const content = template.content;

        PowerDom.$(element).replace(content.childNodes);
    }

    static async process(element, module) {
        const template = select('template', element);
        const content = template.content;

        module.loopHelper = loopHelper;

        return Template._loop(module, content).then(() => {
                Template._elements(content, module);

                Template._listen(module, content);

                PowerDom.$(element).replace(content.childNodes);
            }
        )
    }

    static async _loop(module, content) {
        const promises = [];

        selectAll('[pd-loop]', content).forEach(el => {
            if (!el.hasAttribute('items')) {
                PowerDom.$(el).remove();
            } else {
                promises.push(Template.loopHelper(el, module));
            }
        });

        await Promise.all(promises);
    }

    static async loopHelper(el, module) {
        const dataAttr = el.getAttribute('items');
        let items = (typeof module[dataAttr] === 'function') ? module[dataAttr]() : module[dataAttr];
        let html = '';
        let tpl = '';

        if(items instanceof Promise) {
            await items.then(result => items = result);
        }

        el.removeAttribute('items');
        el.removeAttribute('pd-loop');

        tpl = el.outerHTML.trim();

        if (!Array.isArray(items)) {
            throw 'Items is not an array'
        }

        items.forEach((item, index) => html += module.loopHelper(item, index, tpl));

        PowerDom.$(el).replace(html);
    }

    /**
     * Finds all the elements with _ as attribute and attach them to the current
     * instance
     */
    static _elements(content, module) {
        module._ = {};

        selectAll('[_]', content).forEach(el => module._[el.getAttribute('_')] = PowerDom.$(el));
    }

    /**
     * Finds all the elements with _listen="event1:callback1,event2:callback2" as attribute
     * and adds listener to those element where the callback is this.callback, this.callback2 ...
     */
    static _listen(module, content) {
        selectAll('[_listen]', content).forEach(el => {
            const strListeners = el.getAttribute('_listen');

            if (strListeners.length > 0) {
                strListeners.split(",").forEach(strListener => Template._listenHelper(strListener, el, module));
            }

            el.removeAttribute('_listen');
        });
    }

    static _listenHelper(strListener, el, instance) {
        const [event, callback] = strListener.split(':');

        PowerDom.$(el).listen(event, instance[callback]);
    }
}

customElements.define('pd-tpl',
    class extends HTMLElement {
        constructor() {
            super();

            if (!this.dataset.hasOwnProperty('template')) {
                throw 'Template tag without data-template property'
            }

            Request.getRemoteText(this.dataset.template).then(html => {
                PowerDom.$(this).setContent(html);

                if (this.dataset.hasOwnProperty('module')) {
                    import(this.dataset.module)
                        .then(module => Template.process(this, new module.default()));
                } else {
                    Template.replace(this);
                }
            });
        }
    });

function show(modal) {
    modal.style.display = "block";
}

function close(modal) {
    modal.style.display = "none";
}

const closeBtn = '<span class="close">&times;</span>';

/**
 * Displays a text as a notification
 */
class Notification {
    constructor(modal, modalBody) {
        this.modal = modal;
        this.modalBody = modalBody;
    }

    /**
     * Displays the text for a period of time, default 2 seconds
     * @param {string} message
     * @param {int} [displayTime] milliseconds
     */
    show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000;

        this.modalBody.setContent(message);

        show(this.modal);

        setTimeout(() => {
            close(this.modal);
        }, displayTime);
    }
}

/**
 * Displays a spinner
 */
class Loading {
    constructor(modal, modalBody) {
        this.modal = modal;
        this.modalBody = modalBody;
    }

    /**
     * Displays a spinner for a period of time
     * @param {int} displayTime milliseconds
     */
    show(displayTime) {
        this.modalBody.setContent('<span class="load"></span>');

        show(this.modal);

        if (typeof displayTime != 'undefined') {
            setTimeout(() => {
                close(this.modal);
            }, displayTime);
        }
    }

    /**
     * Hides the spinner and the UI is usable again
     */
    close() {
        close(this.modal);
    }
}

/**
 * Displays an HTML in a pop up blocking the rest of the UI
 */
class Modal {
    constructor(modal, modalBody) {
        this.modal = modal;
        this.modalBody = modalBody;
        this.row = null;
    }

    /**
     * Generates the pop up content using an html string
     * @param {string|Document|DocumentFragment|Element} content
     * @param {boolean} addCloseBtn
     */
    setContent(content, addCloseBtn) {
        if(typeof addCloseBtn != 'undefined' && addCloseBtn) {
            this.row = PowerDom.$('.row', this.modal);
            this.row.prepend(closeBtn);
            PowerDom.$('span.close', this.modal).listen('click', this.close.bind(this));
        }

        this.modalBody.setContent(content);
    }

    /**
     * Displays a pop up with previously generated content and makes the user focus on it by
     * blocking the rest of the UI
     */
    show() {
        show(this.modal);
    }

    /**
     * Hides the pop up
     */
    close() {
        if (this.row != null) {
            PowerDom.$('span.close', this.modal).remove();
            this.row = null;
        }

        close(this.modal);
    }
}

customElements.define('pd-modal',
    class extends HTMLElement {
        constructor() {
            super();

            // build
            const content =
                `<div class="modal-content">
                    <div class="row">
                        <div class="section">          
                            <div class="modal-body"></div>
                        </div>
                    </div>
                </div>`;
            PowerDom.$(this).setContent(content.trim());

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = (event) => {
                if (event.target == this) {
                    close(this);
                }
            };

            // UI tools
            const modalBody = PowerDom.$('.modal-body');

            this.notification = new Notification(this, modalBody);
            this.loading = new Loading(this, modalBody);
            this.modal = new Modal(this, modalBody);

            PowerDom.UI = this;
        }
    });

customElements.define('pd-page',
    class extends HTMLElement {
        constructor() {
            super();

            this.pages = PD.Config.get('pages');
            this.currentTitle = PD.$('title', document.head);

            PD.Page = this;

            this.go('default');
        }

        /**
         * Get the object that describes the page
         * @param {string} index
         * @returns {Object}
         */
        getPage(index) {
            const pages = this.pages;
            let page = null;

            if (index in pages)
                page = pages[index];

            return page
        }

        /**
         * Triggers the mechanism to change the current page using an string
         * @param {string} index
         */
        go(index) {
            const page = this.getPage(index);

            if (!page)
                throw `Invalid page index: ${index}`

            this.navigate(page);
        }

        /**
         * Triggers the mechanism to change the current page using an Object
         * @param {Object} page
         */
         navigate(page) {
            this.currentTitle.setContent(page.title);

            Request.getRemoteText(page.template).then(html => {
                PD.$(this).setContent(html);

                if (page.hasOwnProperty('module')) {
                    import(page.module)
                        .then(module => {
                            const instance = new module.default();

                            Template.process(this, instance)
                                .then(instance.process.bind(instance));
                        });
                } else {
                    Template.replace(this);
                }
            });
        }
    });

const PD$1 = {
    $: PowerDom.$,
    Config,
    Request,
    Template,
    select,
    selectAll,
    PowerDom,
    Modules: {
        Auth: {
            isAuth: () => {return true}
        }
    }
};

window.PD = PD$1;
