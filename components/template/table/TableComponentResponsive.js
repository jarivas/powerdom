class TableComponentResponsive extends ComponentTemplate {
    setUp() {
        const rootNodeContent = this.rootNode.content;
        this.body = PD('div.table-responsive', rootNodeContent);
        
        return this;
    }

    setHeader(data) {
        return this;
    }

    fill(html) {
        this.body.setContent(html);

        return this;
    }
}