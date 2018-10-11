class PageTemplate extends Template {
    /**
    * 
    * @param {Element|Node} nodeTarget 
    * @param {Element|Node|DocumentFragment} templateNode 
    */
    constructor(nodeTarget, templateNode) {
        super(nodeTarget, templateNode);

        ComponentTemplate.LoadComponents(this.nodeTarget);

        PartialTemplate.loadPartials(`pageLoaded${this.constructor.name}`, () => {
            this.partialsLoaded();
            this.handleParameters();
        });        
    }

    /**
     * Processes the entry parameters passed to the page on change
     */
    handleParameters(){}

    /**
     * Executed right after the partials are loaded, typically to
     * retrieve data from the server based on filters
     */
    partialsLoaded() {}

    /**
     * insert the processed template it on the dom 
     */
    attach() {
        const nodeTarget = this.nodeTarget;
        const templateNode = this.templateNode;

        while (nodeTarget.hasChildNodes())
            nodeTarget.removeChild(nodeTarget.firstChild);

        while (templateNode.hasChildNodes())
            nodeTarget.appendChild(templateNode.firstChild)
    }

    /**
     * Use it when something goes wrong, for example
     * on a request
     * @param {string|object} error 
     */
    static handleError(error) {
        let message = '';

        if (typeof error == "string")
            message = error;
        else if (error.hasOwnProperty('message'))
            message = error.message;
        else if (error.hasOwnProperty('error'))
            message = error.error;

        NotificationComponent.show(message);
        console.log(error);
    }
}