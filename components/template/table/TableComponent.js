class TableComponent extends ComponentTemplate {
    setUp() {
        const templateNode = this.templateNode;
        
        this.header = PD('thead > tr', templateNode);
        this.body = PD('tbody', templateNode);
    }

    setHeader(data){
        let css = '';

        this.header.empty();

        for(let [header, isAlph] of Object.entries(data)){
            css = (isAlph) ? 'class="mdl-data-table__cell--non-numeric"' : '';
            this.header.append(`<th ${css}>${header}</th>`)
        }

        return this;
    }

    fill(html){
        this.body.setContent(html);

        return this;
    }
}