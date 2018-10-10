class TableComponent extends ComponentTemplate {
    setUp() {
        const rootNodeContent = this.rootNode.content;
        
        this.header = PD('thead > tr', rootNodeContent);
        this.body = PD('tbody', rootNodeContent);

        return this;
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