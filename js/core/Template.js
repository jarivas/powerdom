class Template {
    constructor(data) {
        this.init(data);

        this.construct();
    }

    /**
     * Initializes the instance with the required data
     * @param {object} data 
     */
    init(data) {}

    /**
     * Inserts the generated html on the target element
     */
    append() {
        const rootNodeContent = this.rootNode.content;
        let node = this.nodeTarget;

        while (node.hasChildNodes())
            node.removeChild(node.firstChild);

        node.appendChild(rootNodeContent);
    }

    /**
     * Replaces the generated html on the target element
     */
    replace() {
        const rootNodeContent = this.rootNode.content;
        let node = this.nodeTarget;
        let parent = node.parentNode;

        while (rootNodeContent.hasChildNodes())
            parent.insertBefore(rootNodeContent.firstChild, node);

        parent.removeChild(node);

        this.nodeTarget = parent;
    }

    /**
     * Build the new html, insert it on the dom
     */
    construct() {
        this.setUp();
        this.attach();
        this.bind();
    }

    /**
     * insert the processed template it on the dom 
     */
    attach() {
        this.replace(this.rootNode.content);
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