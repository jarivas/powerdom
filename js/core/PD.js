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

        if (typeof element != 'undefined')
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
 * A innerHtml replacement and a shortcut to avoid
 * unnecesary instances
 * @param {Document|DocumentFragment|Element} targetElement
 * @param {string} html
 */
PD.setContent = function (targetElement, html) {
    while (targetElement.hasChildNodes())
        targetElement.removeChild(targetElement.lastChild);

    targetElement.insertAdjacentHTML('beforeend', html);
}

/**
 * A faster setContent
 * @param {Document|DocumentFragment|Element} targetElement
 * @param {Document|DocumentFragment|Element} element
 */
PD.setContentElement = function (targetElement, element) {
    while (targetElement.hasChildNodes())
        targetElement.removeChild(targetElement.lastChild);

    targetElement.insertAdjacentHTML('beforeend', element);
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
    const worker = new Worker(workerUrl);

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
 * Loads dynamically the html string and returns the element
 * @param {string} url 
 * @param {templateCallback} callback 
 */
PD.LoadTemplate = function (url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(PD.LoadTemplateHelper)
        .then(callback);
}

PD.LoadTemplateHelper = function (html) {
    let templateElement = document.createElement("template");

    PD.setContent(templateElement, html.trim());

    return templateElement;
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
        .then(text => PD.loadJSClassHelper(text, className))
        .then(callback);
}

PD.loadJSClassHelper = function (text, className) {
    eval(`window.${className} = ${text}`);
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
 * @param {array} params 
 * @return {object}
 */
PD.getInstance = function (className, params) {
    return eval(`new ${className}(...params);`);
}

/**
 * Set a instance to an variable
 * @param {string} varName 
 * @param {string} className 
 * @param {array} params  
 */
PD.createInstance = function (varName, className, params) {
    eval(`${varName} = new ${className}(...params);`);
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

PD.isTouchable = function(){
    //Android and IE Mobile
    if(navigator.userAgent.match(/Mobi/) || 'ontouchstart' in document.documentElement)
        return true;

    //iOs
    if(!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && 
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
        return true;

    return false;
}

window.PD = PD;

/**
 * @callback restCallback
 * @param {string} json
 * 
 * @callback templateCallback
 * @param {HTMLTemplateElement} templateElement
 * 
 * @callback errorCallback
 * @param {object} error
 * 
 * @callback EventListener
 * @param {object} event
 */