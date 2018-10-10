class PowerDom {

    /**
     * You should not instanciate this directly, use PD
     * @param {Element[]|NodeList} elements 
     */
    constructor(elements) {
        this.elements = elements;
    }

    /**
     * Set the inner html of all elements matches by the selector
     * @param {string} html 
     * @returns {PowerDom} this
     */
    setContent(html) {
        this.elements.forEach(element => {

            while (element.hasChildNodes())
                element.removeChild(element.lastChild);

            element.insertAdjacentHTML('beforeend', html);
        });

        return this;
    }

    /**
     * Return a string or strings with the contents 
     * @returns {string|string[]}
     */
    getContent() {
        let content = [];

        this.elements.forEach(element => content.push(element.innerHTML));

        return (content.length == 1) ? content[0] : content;
    }


    /**
     * Set the property value
     * @param {string|number} value 
     * @returns {PowerDom} this
     */
    setValue(value) {
        this.elements.forEach(element => element.value = value);

        return this;
    }

    /**
     * Get the value or values
     * @returns {string|number|{string|number}[]}
     */
    getValue() {
        let values = [];

        this.elements.forEach(element => values.push(element.value));

        return (values.length == 1) ? values[0] : values;
    }

    /**
     * Replace element with a html string
     * @param {string} html 
     * @returns {PowerDom} this
     */
    replace(html) {
        let parent = null;

        this.elements.forEach(element => {
            element.insertAdjacentHTML('beforebegin', html);
            parent = element.parentNode
            parent.removeChild(element);
            element = parent.querySelector(this.selector);
        });

        return this;
    }

    /**
     * Parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree
     * inside the element, before its first child.
     * @param {string} html 
     * @returns {PowerDom} this
     */
    prepend(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('afterbegin', html));

        return this;
    }

    /**
     * Parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree
     * inside the element, after its last child.
     * @param {string} html 
     * @returns {PowerDom} this
     */
    append(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('beforeend', html));

        return this;
    }

    /**
     * Parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree
     * before the element itself
     * @param {string} html 
     * @returns {PowerDom} this
     */
    insertBefore(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('beforebegin', html));

        return this;
    }

    /**
     * Parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree
     * after the element itself
     * @param {string} html 
     * @returns {PowerDom} this
     */
    insertAfter(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('afterend', html));

        return this;
    }


    /**
     * Returns an string or string[] with the copies  
     * @returns {string|string[]}
     */
    getHtml() {
        let clones = [];

        this.elements.forEach(element => clones.push(element.outerHTML));

        return (clones.length == 1) ? clones[0] : clones;
    }

    /**
     * Clean the inside of the element(s)
     * @param {string} html 
     * @returns {PowerDom} this
     */
    empty() {
        this.elements.forEach(element => {
            while (element.hasChildNodes())
                element.removeChild(element.lastChild);
        });

        return this;
    }

    /**
     * Removes all the elements
     */
    remove() {
        this.elements.forEach(element => element.parentNode.removeChild(element));
        this.elements = [];
    }

    /**
     * Sets up a function that will be called whenever the specified event is delivered to the target
     * @param {string} event
     * @param {EventListener} callback
     * @returns {PowerDom} this
     */
    listen(event, callback) {
        this.elements.forEach(element => element.addEventListener(event, callback));

        return this;
    }

    /**
     * Invokes the function previous set for this event
     * @param {string} event 
     */
    fire(event) {
        this.elements.forEach(element => element.dispatchEvent(new CustomEvent(event)));

        return this;
    }

    /**
     * Removes the event listener previously registered
     * @param {string} event
     * @param {EventListener} callback
     * @returns {PowerDom} this
     */
    mute(event, callback) {
        this.elements.forEach(element => element.removeEventListener(event, callback));

        return this;
    }

    /**
     * Invokes the callback for every element
     * @param {foreachCallback} callback 
     * @returns {PowerDom} this
     */
    foreach(callback) {
        this.elements.forEach((element, index) => callback(PD(element), index));

        return this;
    }

    /**
     * Add specified class values. If these classes already exist in attribute of the element,
     * then they are ignored.
     * @param {string} cssClass 
     */
    addClass(cssClass) {
        this.elements.forEach(element => element.classList.add(cssClass));

        return this;
    }

    /**
     * Remove specified class values. Removing a class that does not exist does NOT throw an error.
     * @param {string} cssClass 
     */
    removeClass(cssClass) {
        this.elements.forEach(element => element.classList.remove(cssClass));

        return this;
    }

    /**
     * If the class is present will be removed and viceversa
     * @param {string} cssClass 
     */
    toggleClass(cssClass) {
        this.elements.forEach(element => element.classList.toggle(cssClass));

        return this;
    }

    /**
     * Sets a property with its value
     * @param {string} index 
     * @param {string} value 
     * @returns {PowerDom} this
     */
    setProperty(index, value) {
        this.elements.forEach(element => element[index] = value);

        return this;
    }

    /**
     * Gets the value or values of the property
     * @param {string} index
     * @returns {string|string[]}
     */
    getProperty(index) {
        let values = [];

        this.elements.forEach(element => values.push(element[index]));

        return (values.length == 1) ? values[0] : values;
    }

    /**
     * Removes a property in case you need it
     * @param {string} index
     * @returns {PowerDom} this
     */
    removeProperty(index) {
        this.elements.forEach(element => delete element[index]);

        return this;
    }

    /**
     * Sets a new member on the elements dataset
     * @param {string} index 
     * @param {string} value 
     * @returns {PowerDom} this
     */
    setData(index, value) {
        this.elements.forEach(element => element.dataset[index] = value);

        return this;
    }

    /**
     * Get the value or values
     * @param {string} index 
     * @returns {string|string[]}
     */
    getData(index) {
        let data = [];

        this.elements.forEach(element => data.push(element.dataset[index]));

        return (data.length == 1) ? data[0] : data;
    }

}

/**
 * Gets and PowerDom Instance
 * @param {DOMString|Element|Node} selector 
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {PowerDom}
 */
PD = function (selector, element) {
    let instance = null;

    if (typeof selector != 'string') {
        instance = new PowerDom([selector]);
    } else {
        instance = PD.findAll(selector, element);

        instance = (instance.length > 0) ? new PowerDom(instance) : null;
    }

    if (instance) {
        instance.selector = selector;

        if(typeof element != 'undefined')
            instance.element = element;
    }

    return instance;
};


/**
 * Returns the first Element within the document that matches the specified selector,
 * or group of selectors. If no matches are found, null is returned.
 * @param {DOMString} selector
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {Element|Node}
 */
PD.find = function (selector, element) {
    element = (typeof element == 'undefined') ? document : element;
    return element.querySelector(selector);
}

/**
 * Returns a static (not live) NodeList representing a list of the document's element
 *  that match the specified group of selectors.
 * @param {DOMString} selector
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {Element[]|NodeList}
 */
PD.findAll = function (selector, element) {
    element = (typeof element == 'undefined') ? document : element;
    return element.querySelectorAll(selector);
}

/**
 * Rest request to the previos configured url
 * @param {object} data
 * @param {restCallback} callback The callback that handles the response.
 * @param {errorCallback} errorCb The callback that handles the error.
 */
PD.requestJson = function (data, callback, errorCb) {

    fetch(PD.apiUrl, {
        method: 'post',
        body: data ? JSON.stringify(data) : null,
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(response => response.json())
        .then(callback)
        .catch(errorCb);
}

/**
 * Rest request to the previos configured url that will be processed
 * in a background worker
 * @param {object} data 
 * @param {string} workerUrl 
 * @param {restCallback} callback 
 * @param {errorCallback} errorCb 
 */
PD.requestWorker = function (data, workerUrl, callback, errorCb) {
    let worker = new Worker(workerUrl);

    worker.addEventListener('message', callback, false);
    worker.addEventListener('error', errorCb, false);

    fetch(PD.apiUrl, {
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

/**
 * Loads dynamically <template>..</template> and process it
 * @param {string} url 
 * @param {templateCallback} callback 
 */
PD.LoadTemplate = function (url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(callback);
}

/**
 * Loads dynamically a js class and make it global
 * @param {string} url 
 * @param {string} className 
 * @param {function} callback 
 */
PD.loadJSClass = function (url, className, callback) {
    fetch(url)
        .then(response => response.text())
        .then(text => eval(`window.${className} = ${text}`))
        .then(callback);
}

/**
 * Loads dynamically a js file
 * @param {string} url 
 * @param {function} callback 
 */
PD.loadJSFile = function (url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(eval)
        .then(callback);
}

/**
 * Creates a instace of a class and returns it
 * @param {string} className 
 * @param {Element|Node} data 
 * @return {object}
 */
PD.getInstance = function (className, data) {
    let class_str = `new ${className}(data);`;

    return eval(class_str);
}

/**
 * Set a instance to an variable
 * @param {string} varName 
 * @param {string} className 
 * @param {Element|Node} data 
 */
PD.createInstance = function (varName, className, data) {
    let class_str = `${varName} = new ${className}(data);`;

    eval(class_str);
}

/**
 * Sets up a function that will be called whenever the specified event is delivered
 * @param {string} event
 * @param {EventListener} callback
 */
PD.listen = (event, callback) => window.addEventListener(event, callback);

/**
 * Invokes the function previous set for this event
 * @param {string} event
 * @param {object} detail
 */
PD.fire = (event, detail) => window.dispatchEvent(new CustomEvent(event, { detail: detail }));

/**
 * Removes the event listener previously registered
 * @param {string} event
 * @param {EventListener} callback
 */
PD.mute = (event, callback) => window.removeEventListener(event, callback);

window.PD = PD;

/**
 * @callback restCallback
 * @param {string} json
 * 
 * @callback templateCallback
 * @param {string} text
 * 
 * @callback errorCallback
 * @param {object} error
 * 
 * @callback EventListener
 * @param {object} event
 * 
 * @callback foreachCallback
 * @param {PowerDom} element
 * @param {index} indexOptional
 */