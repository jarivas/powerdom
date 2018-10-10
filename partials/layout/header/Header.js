class Header extends PartialTemplate {
    setUp() {
        const rootNodeContent = this.rootNode.content;
        const pagesInfo = PageManager.getInfo();

        //This way is better because select both nav elements
        const nav = PD('nav.mdl-navigation', rootNodeContent);

        //"Following" the html template pattern where, you 
        //clone the code and use it 
        const templateLink = PD('a', rootNodeContent).getHtml();

        let newEl = '';
        let pageTitle = ''
        let eventName = '';
        let events = {}

        nav.empty();

        pagesInfo.data.forEach((page) => {
            pageTitle = page.title;
            eventName = `pageLoaded${page.className}`;

            //Add link to the navigation
            if (page.navigation) {
                newEl = templateLink.replace('{link}', page.title);

                nav.append(newEl);
            }

            //Listen to change page event in order to change the css class
            events[eventName] = pageTitle;
            PD.listen(eventName, Header.updateIsActive);
        });

        Header.prototype.pageEvents = events;
        PD('.mdl-layout-title', rootNodeContent).setContent(window.config.website);
    }

    bind() {
        Header.prototype.links = PD('.mdl-navigation__link', this.nodeTarget).listen('click', Header.click);
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

    static updateIsActive(e) {
        const title = Header.prototype.pageEvents[e.type];

        console.log('updateIsActive ', title);

        Header.prototype.links.removeClass('is-active')
            .foreach((el) => {
                if (el.getContent() == title)
                    el.addClass('is-active');
            });
    }
}