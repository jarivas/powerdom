class Footer extends PartialTemplate {
    setUp() {
        const rootNodeContent = this.rootNode.content;
        const pagesInfo = PageManager.getInfo();

        const list = PD('ul.mdl-mini-footer__link-list', rootNodeContent);

        //"Following" the html template pattern where, you 
        //clone the code and use it 
        const templateLink = PD('li', rootNodeContent).getHtml();

        let newEl = '';

        list.empty();

        pagesInfo.data.forEach((page) => {
            if (page.navigation) {
                newEl = templateLink.replace('{link}', page.title);

                list.append(newEl);
            }
        });
    }

    bind() {
        PD('.mdl-mini-footer__link-list a', /*this.nodeTarget*/).listen('click', Footer.click);
    }
    
    /**
     * Even if is an static function, the scope is the a tag
     * static does not alter the normal js way of working
     * @param {object} e 
     */
    static click(e) {
        e.preventDefault();

        PageManager.changePage(PD(this).getContent());
    }
}