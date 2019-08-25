const ELEMENT_NODE = Node.ELEMENT_NODE

const helper = {
    POSITION_BEFORE_BEGIN: 'beforebegin',
    POSITION_AFTER_BEGIN: 'afterbegin',
    POSITION_BEFORE_END: 'beforeend',
    POSITION_AFTER_END: 'afterend',
    insertAdjacent: function(element, position, html) {
        if (typeof html == 'string') {
            element.insertAdjacentHTML(position, html)
        } else if (html instanceof NodeList) {
            html.forEach(n => {
                if (n.nodeType === ELEMENT_NODE)
                    element.insertAdjacentElement(position, n)
            })
        } else {
            element.insertAdjacentElement(position, html)
        }
    }
}


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
        let elements = null

        if (typeof element == 'undefined')
            element = document

        elements = element.querySelectorAll(selector)

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
        this.elements = elements
    }

    /**
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    setContent(html) {
        this.elements.forEach(element => {

            while (element.hasChildNodes())
                element.removeChild(element.lastChild)

            helper.insertAdjacent(element, helper.POSITION_BEFORE_END, html)
        })

        return this
    }

    /**
     * Return a string or strings with the contents 
     * @returns {string|string[]}
     */
    getContent() {
        const content = []

        this.elements.forEach(element => content.push(element.innerHTML))

        return (content.length > 1) ? content : content[0]
    }

    /**
     * Set the property value
     * @param {string|number} value 
     * @returns {PowerDom} this
     */
    setValue(value) {
        this.elements.forEach(element => element.value = value)

        return this
    }

    /**
     * Get the value or values
     * @returns {string|number|{string|number}[]}
     */
    getValue() {
        const values = []

        this.elements.forEach(element => values.push(element.value))

        return (values.length > 1) ? values : values[0]
    }

    /**
     * Replace element(s) with a html string
     * @param {string|Document|DocumentFragment|Element} html 
     */
    replace(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_BEFORE_BEGIN, html)

            element.parentElement.removeChild(element)
        })

        delete this
    }

    /**
     * Inserts the resulting nodes into the DOM tree inside the element, before its first child.
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    prepend(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_AFTER_BEGIN, html)
        })

        return this
    }

    /**
     * Inserts the resulting nodes into the DOM tree inside the element, after its last child.
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    append(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_BEFORE_END, html)
        })
        return this
    }

    /**
     * Inserts the resulting nodes into the DOM tree before the element itself
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    insertBefore(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_BEFORE_BEGIN, html)
        })

        return this
    }

    /**
     * Inserts the resulting nodes into the DOM tree after the element itself
     * @param {string|Document|DocumentFragment|Element} html 
     * @returns {PowerDom} this
     */
    insertAfter(html) {
        this.elements.forEach(element => {
            helper.insertAdjacent(element, helper.POSITION_AFTER_END, html)
        })

        return this
    }

    /**
     * Returns an string or string[] with the copies  
     * @returns {string|string[]}
     */
    getHtml() {
        const clones = []

        this.elements.forEach(element => clones.push(element.outerHTML))

        return (clones.length > 1) ? clones : clones[0]
    }

    /**
     * Clean the inside of the element(s)
     */
    empty() {
        this.elements.forEach(element => {
            while (element.hasChildNodes())
                element.removeChild(element.lastChild)

            element.remove()
        })
    }

    /**
     * Removes all the elements
     */
    remove() {
        this.elements.forEach(element => {
            while (element.hasChildNodes())
                element.removeChild(element.lastChild)

            if(element.parentElement)
                element.parentElement.removeChild(element)
        })

        delete this
    }

    /**
     * Sets up a function that will be called whenever the specified event is delivered to the target
     * @param {string} event
     * @param {EventListener} callback
     * @returns {PowerDom} this
     */
    listen(event, callback) {
        this.elements.forEach(element => element.addEventListener(event, callback))

        return this
    }

    /**
     * Invokes the function previous set for this event
     * @param {string} event 
     */
    fire(event) {
        this.elements.forEach(element => element.dispatchEvent(new CustomEvent(event)))

        return this
    }

    /**
     * Removes the event listener previously registered
     * @param {string} event
     * @param {EventListener} callback
     * @returns {PowerDom} this
     */
    mute(event, callback) {
        this.elements.forEach(element => element.removeEventListener(event, callback))

        return this
    }

    /**
     * Add specified class values. If these classes already exist in attribute of the element,
     * then they are ignored.
     * @param {string} cssClass 
     */
    addClass(cssClass) {
        this.elements.forEach(element => element.classList.add(cssClass))

        return this
    }

    /**
     * Remove specified class values. Removing a class that does not exist does NOT throw an error.
     * @param {string} cssClass 
     */
    removeClass(cssClass) {
        this.elements.forEach(element => element.classList.remove(cssClass))

        return this
    }

    removeAllClasses() {
        this.elements.forEach(element => {
            const list = element.classList
            list.forEach(css => list.remove(css))
        })

        return this
    }

    /**
     * If the class is present will be removed and viceversa
     * @param {string} cssClass 
     */
    toggleClass(cssClass) {
        this.elements.forEach(element => element.classList.toggle(cssClass))

        return this
    }

    /**
     * Sets an attribute with its value
     * @param {string} index 
     * @param {string} value 
     * @returns {PowerDom} this
     */
    setAttribute(index, value) {
        this.elements.forEach(element => element.setAttribute(index, value))

        return this
    }

    /**
     * removes an attribute
     * @param {string} index 
     * @returns {PowerDom} this
     */
    removeAttribute(index) {
        this.elements.forEach(element => element.removeAttribute(index))

        return this
    }

    /**
     * Gets the value or values of the property
     * @param {string} index
     * @returns {string|string[]}
     */
    getProperty(index) {
        const values = []

        this.elements.forEach(element => values.push(element[index]))

        return (values.length > 1) ? values : values[0]
    }

    /**
     * Removes a property in case you need it
     * @param {string} index
     * @returns {PowerDom} this
     */
    removeProperty(index) {
        this.elements.forEach(element => delete element[index])

        return this
    }

    /**
     * Sets a new member on the elements dataset
     * @param {string} index 
     * @param {string} value 
     * @returns {PowerDom} this
     */
    setData(index, value) {
        this.elements.forEach(element => element.dataset[index] = value)

        return this
    }

    /**
     * Get the value or values
     * @param {string} index 
     * @returns {string|string[]}
     */
    getData(index) {
        const data = []

        this.elements.forEach(element => data.push(element.dataset[index]))

        return (data.length > 1) ? data : data[0]
    }

    /**
     * Get the reference or references to the contained nodes
     */
    getElements() {
        const elements = this.elements

        return (elements.length > 1) ? elements : elements[0]
    }

    select(selector) {
        const data = []

        this.elements.forEach(element => {
            const node = select(selector, element)

            if(node)
                data.push(node)
        })

        return (data.length > 1) ? data : data[0]
    }
    
    selectAll(selector) {
        let data = []

        this.elements.forEach(element => {
            const nodeList = selectAll(selector, element)
            
            if(nodeList.length > 0)
                data = data.concat(nodeList)
        })

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
    element = (typeof element == 'undefined') ? document : element
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
    element = (typeof element == 'undefined') ? document : element
    return element.querySelectorAll(selector)
}

export { PowerDom, select, selectAll }
/**
 * @callback errorCallback
 * @param {object} error
 *
 * @callback EventListener
 * @param {object} event
 */