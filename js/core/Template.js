class Template {
    /**
     * 
     * @param {Element|Node} nodeTarget 
     * @param {Element|Node|DocumentFragment} templateNode 
     */
    constructor(nodeTarget, templateNode) {
        this.nodeTarget = nodeTarget;
        this.templateNode = templateNode;

        this.setUp();
        this.attach();
        this.bind();
    }

    /**
     * Replaces the generated html on the target element
     */
    replace() {
        const nodeTarget = this.nodeTarget;
        const templateNode = this.templateNode;
        const parent = nodeTarget.parentNode;

        while (templateNode.hasChildNodes())
            parent.insertBefore(templateNode.firstChild, nodeTarget);

        parent.removeChild(nodeTarget);

        this.nodeTarget = parent;
    }

    /**
     * insert the processed template it on the dom 
     */
    attach() {
        this.replace();
    }

    /**
     * Prepare the elements or give them content before attach to the nodeTarget
     */
    setUp() {}

    /**
     * Attach events to the elements that required it
     */
    bind() {}
}