class PageTemplate extends Template {

    /**
     * Set ups the instance with the required data
     * @param {Element|Node} main
     */
    init(main) {
        this.rootNode = main.firstChild;
        this.nodeTarget = main;
        this.templateNode = this.rootNode.cloneNode(true);
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
        this.append(this.rootNode.content);
    }

    /**
     * Build the new html, insert it on the dom and triggers a
     * pageLoaded event
     */
    construct() {
        super.construct();
        ComponentTemplate.LoadComponents(this.nodeTarget);
        PartialTemplate.loadPartials(`pageLoaded${this.constructor.name}`, () => {
            this.partialsLoaded();
            this.handleParameters();
        });        
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