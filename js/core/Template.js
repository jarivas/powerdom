class Template {

    constructor(params) {

        if (params instanceof Array)
            this.initPage(params);
        else
            this.initTemplate(params);

        this.build();
        this.bind();
    }

    initPage(params) {
        this.curDoc = params[0].import;
        this.nodeTarget = params[1];
        this.rootNode = PD.find('template', this.curDoc);
        this.templateHtml = this.rootNode.innerHTML;
    }

    initTemplate(params) {
        this.curDoc = (params._currentScript || params.currentScript).ownerDocument;
        this.rootNode = PD.find('template', this.curDoc);
        this.nodeTarget = PD.find(this.rootNode.dataset.selector);
    }

    append(rootNodeContent) {
        this.nodeTarget.innerHTML = '';
        this.nodeTarget.appendChild(rootNodeContent);
    }
    
    rebuild() {
        this.rootNode.innerHTML = this.templateHtml;
        this.build();
    }

    build() {

    }

    bind() {

    }
}