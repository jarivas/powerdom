class Template {
    /**
     * 
     * @param {Element|Node} nodeTarget 
     * @param {Element|Node|DocumentFragment} templateNode
     * @param {boolean|object} extraParams
     */
    constructor(nodeTarget, templateNode, extraParams) {
        this.nodeTarget = nodeTarget;
        this.templateNode = templateNode;

        if(extraParams){
            for(let [key, value] of Object.entries(extraParams))
               this[key] = value;
        }

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

    static getFilename(className, data){
        let fileName = className;

        if (data.hasOwnProperty('responsive')) {
            const responsive = (data.responsive.hasOwnProperty('value')) ? data.responsive.value : data.responsive;  
            responsive.split(',').forEach(mediaFileName => {
                mediaFileName = mediaFileName.split('|');

                if ((mediaFileName[0] == 'touchable' && PD.isTouchable()) || window.matchMedia(mediaFileName[0]).matches)
                    fileName = mediaFileName[1];
            });
        }

        return fileName;
    }
}