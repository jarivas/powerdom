class Layout {
    static init() {
        const config = window.config;
        const pages = config.pages;
        const menu = PD('.header nav ul.menu');
        let html = '';

        Layout.prototype.mainElement = PD(config.mainElementSelector);
        Layout.prototype.title = select('head > title');

        Object.entries(pages).forEach(([page, data]) => {
            if(data.navigation)
                html += `<li><a href="#" data-page="${page}">${data.title}</a></li>`
        });

        menu.setContent(html);

        PD('li > a', menu.getElements()).listen('click', Layout.click);

        Layout.changePage('default');
    }

    static click(e) {
        e.preventDefault();

        Layout.changePage(e.target.dataset.page);
    }

    static changePage(index){
        const page = window.config.pages[index];
        const mainElement = Layout.prototype.mainElement;
        
        Importer.importTemplate(page.template, mainElement)
            .then(Layout.prototype.title = page.title);
    }
}

export default Layout;