class PowerDom {
    /**
     * A shortcut to instanciate 
     * @param {DOMString|Document|DocumentFragment|Element} selector one or more comma separated
     * @param {Document|DocumentFragment|Element} [element]
     * @returns {PowerDom}
     */
    static getInstance(selector, element) {
        const elements = selectAll(selector, element);

        if (!elements)
            throw 'No elements selected';

        return new PowerDom(elements);
    }

    /**
     * 
     * @param {Element[]|NodeList} elements 
     */
    constructor(elements) {
        this.elements = elements;
    }

    /**
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
     * @param {Document|DocumentFragment|Element} el
     * @returns {PowerDom} this
     */
    setContentElement(el) {
        this.elements.forEach(element => {

            while (element.hasChildNodes())
                element.removeChild(element.lastChild);

            element.insertAdjacentElement('beforeend', el);
        });

        return this;
    }

    setContentMultipleElements(nodes) {
        {
            this.elements.forEach(element => {

                while (element.hasChildNodes())
                    element.removeChild(element.lastChild);

                nodes.forEach(n => element.insertAdjacentElement('beforeend', n))
            });

        }
    }

    /**
     * Return a string or strings with the contents 
     * @returns {string|string[]}
     */
    getContent() {
        const content = [];

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
        const values = [];

        this.elements.forEach(element => values.push(element.value));

        return (values.length == 1) ? values[0] : values;
    }

    /**
     * Replace element(s) with a html string
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
     * Replace element(s) with another element
     * @param {Document|DocumentFragment|Element} el
     * @returns {PowerDom} this
     */
    replaceElement(el) {
        let parent = null;

        this.elements.forEach(element => {
            element.insertAdjacentElement('beforebegin', el);
            parent = element.parentNode
            parent.removeChild(element);
            element = parent.querySelector(this.selector);
        });

        return this;
    }

    /**
     * Inserts the resulting nodes into the DOM tree inside the element, before its first child.
     * @param {string} html 
     * @returns {PowerDom} this
     */
    prepend(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('afterbegin', html));

        return this;
    }

    /**
     * Inserts the nodes into the DOM tree inside the element, before its first child.
     * @param {Document|DocumentFragment|Element} el
     * @returns {PowerDom} this
     */
    prependElement(el) {
        this.elements.forEach(element => element.insertAdjacentElement('afterbegin', el));

        return this;
    }

    /**
     * Inserts the resulting nodes into the DOM tree inside the element, after its last child.
     * @param {string} html 
     * @returns {PowerDom} this
     */
    append(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('beforeend', html));

        return this;
    }

    /**
     * Inserts the nodes into the DOM tree inside the element, after its last child.
     * @param {Document|DocumentFragment|Element} el
     * @returns {PowerDom} this
     */
    appendElement(el) {
        this.elements.forEach(element => element.insertAdjacentElement('beforeend', el));

        return this;
    }

    /**
     * Inserts the resulting nodes into the DOM tree before the element itself
     * @param {string} html 
     * @returns {PowerDom} this
     */
    insertBefore(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('beforebegin', html));

        return this;
    }

    /**
     * Inserts the resulting nodes into the DOM tree before the element itself
     * @param {Document|DocumentFragment|Element} el
     * @returns {PowerDom} this
     */
    insertElement(el) {
        this.elements.forEach(element => element.insertAdjacentElement('beforebegin', el));

        return this;
    }

    /**
     * Inserts the resulting nodes into the DOM tree after the element itself
     * @param {string} html 
     * @returns {PowerDom} this
     */
    insertAfter(html) {
        this.elements.forEach(element => element.insertAdjacentHTML('afterend', html));

        return this;
    }

    /**
     * Inserts the resulting nodes into the DOM tree after the element itself
     * @param {string} html 
     * @returns {PowerDom} this
     */
    insertAfterElement(el) {
        this.elements.forEach(element => element.insertAdjacentElement('afterend', el));

        return this;
    }


    /**
     * Returns an string or string[] with the copies  
     * @returns {string|string[]}
     */
    getHtml() {
        const clones = [];

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

    removeAllClasses() {
        this.elements.forEach(element => {
            const list = element.classList;
            list.forEach(css => list.remove(css));
        });

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
    setAttribute(index, value) {
        this.elements.forEach(element => element.setAttribute(index, value));

        return this;
    }

    /**
     * Sets a property with its value
     * @param {string} index 
     * @returns {PowerDom} this
     */
    removeAttribute(index) {
        this.elements.forEach(element => element.removeAttribute(index));

        return this;
    }

    /**
     * Gets the value or values of the property
     * @param {string} index
     * @returns {string|string[]}
     */
    getProperty(index) {
        const values = [];

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
        const data = [];

        this.elements.forEach(element => data.push(element.dataset[index]));

        return (data.length == 1) ? data[0] : data;
    }

    /**
     * Get the reference or references to the contained nodes
     */
    getElements() {
        const elements = this.elements;

        return (elements.length == 1) ? elements[0] : elements;
    }
}

/**
 * Returns the first Element within the document that matches the specified selector,
 * or group of selectors. If no matches are found, null is returned.
 * @param {DOMString} selector one or more comma separated
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {Element|Node}
 */
function select(selector, element) {
    element = (typeof element == 'undefined') ? document : element;
    return element.querySelector(selector);
}

/**
 * Returns a static (not live) NodeList representing a list of the document's element
 *  that match the specified group of selectors.
 * @param {DOMString} selector one or more comma separated
 * @param {Document|DocumentFragment|Element} [element]
 * @returns {Element[]|NodeList}
 */
function selectAll(selector, element) {
    element = (typeof element == 'undefined') ? document : element;
    return element.querySelectorAll(selector);
}

export { PowerDom, select, selectAll };
/**
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