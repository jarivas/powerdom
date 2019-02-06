const DialogElement = PD('dialog');
const closeBtn = `<br><br><button class="btn tiny" onclick="window.UIHelpers.Modal.close()">Close</button>`;
const menuClick = (e) => {
    e.preventDefault();
    Page.changePage(e.target.dataset.page);
}

class Notification {
    static show(message, displayTime) {
        if (typeof displayTime == 'undefined')
            displayTime = 2000;

        DialogElement.removeAllClasses()
            .addClass('notification')
            .setContent(message)
            .getElements()
            .show();

        setTimeout(() => {
            DialogElement.getElements().close();
        }, displayTime)
    }
}

class Loading {
    static show(displayTime) {
        DialogElement.removeAllClasses()
            .setContent('<span class="load"></span>')
            .getElements()
            .showModal();

        if (typeof displayTime != 'undefined') {
            setTimeout(() => {
                DialogElement.getElements().close();
            }, displayTime)
        }
    }

    static close() {
        DialogElement.getElements().close();
    }
}

class Modal {
    static show(content, addCloseBtn) {
        if (typeof addCloseBtn != 'undefined' && addCloseBtn)
            content = content.concat(closeBtn);

        DialogElement.removeAllClasses()
            .setContent(content)
            .getElements()
            .showModal();
    }

    static close() {
        DialogElement.getElements().close();
    }
}

class Page {
    static init() {
        Page.prototype.mainElement = PD(config.mainElementSelector);
        Page.prototype.title = PD('head > title');
    }

    static buildMenu(callback) {
        const config = window.config;
        const pages = config.pages;
        const menu = PD('.header nav ul.menu');
        let html = '';

        Request.json('curriculum/getStructure', {}, ((structure) => {
            window.structure = structure;

            Object.keys(structure).forEach((key) => {
                if (key != 'personalData') {
                    const page = {
                        template: `templates/pages/${key}.html`,
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        navigation: true,
                        auth: true
                    };
                    html = `<li><a href="#" data-page="${key}">${page.title}</a></li>${html}`;
                    pages[key] = page;
                }
            });

            menu.setContent(html.trim());

            PD('li > a', menu.getElements()).listen('click', menuClick);

            callback();

        }), Request.handleError, { AUTH: window.token });
    }

    static changePage(index) {
        const page = window.config.pages[index];
        const mainElement = Page.prototype.mainElement;

        if (page.auth && typeof window.token == 'undefined')
            return false;

        UIHelpers.Loading.show();

        Importer.importTemplate(page.template, mainElement)
            .then(() => {
                Page.prototype.title.setContent(page.title);
                UIHelpers.Loading.close();
            });
    }
}

export { Notification, Loading, Modal, Page }