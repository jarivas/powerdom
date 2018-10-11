class TableComponentResponsive extends ComponentTemplate {
    setUp() {
        const templateNode = templateNode;
        this.body = PD('div.table-responsive', templateNode);
        
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