const menuClick = (e) => {
    e.preventDefault();
    PageHelper.changePage(e.target.dataset.page);
}

const addNewClick = (e) => {
    const p = PageHelper.prototype;
    e.preventDefault();

    p.btn.setContent('Save');
    p.form.removeClass('hide');
}

const markAsEdited = () => {
    let mark = true;

    PageHelper.prototype.fields.getElements().forEach(field => {
        if (field.value.length == 0)
            mark = false;
    });

    if (mark) {
        PageHelper.prototype.btn
            .removeAttribute('disabled')
            .setContent('Click to save!');
    } else {
        PageHelper.prototype.btn
            .setAttribute('disabled');
    }

}

const save = () => {
    Request.json('curriculum/set', PageHelper.prototype.data,
        Request.handleError, { AUTH: PageHelper.prototype.token })
        .then(addedSuccessfully);
}

const addItem = () => {
    let data = {};
    let sendSave = true;

    PageHelper.prototype.fields.getElements().forEach(field => {
        if (field.value.length > 0)
            data[field.id] = field.value;
        else
            sendSave = false;
    });

    if (sendSave) {
        const index = PageHelper.prototype.index;

        if (!PageHelper.prototype.data.hasOwnProperty(index))
            PageHelper.prototype.data[index] = [];

        PageHelper.prototype.data[index].push(data);
        save();
    }
}

const addedSuccessfully = (result) => {
    console.log(result);

    PageHelper.changePage(PageHelper.prototype.index);
}

const showForm = (e) => {

}

const showAlert = (e) => {
    const i = e.target.dataset.index;
    const body = `<p>Are you sure?`+
        `</p><p><button class="btn small solid green" onclick="UIHelpers.Modal.close()">No</button>`+ 
        `<button class="btn small solid red" onclick="PageHelper.deleteItem(${i})">Yes</button><p>`;
    UIHelpers.Modal.setContent(body);
    UIHelpers.Modal.show();
}

class PageHelper {
    static init() {
        PageHelper.prototype.mainElement = select(config.mainElementSelector);
        PageHelper.prototype.mainElementPD = new PowerDom([PageHelper.prototype.mainElement]);
        PageHelper.prototype.title = PD('title', document.head);
    }

    static async buildMenu() {
        const config = window.config;
        const pages = config.pages;
        const menu = PD('.header nav ul.menu', document);
        let html = '';

        return Request.json('curriculum/getStructure', {}, Request.handleError, { AUTH: PageHelper.prototype.token })
            .then((structure) => {
                PageHelper.prototype.structure = structure;

                Object.keys(structure).forEach((key) => {
                    let page = null;
                    if (key != 'personalData') {
                        page = {
                            template: `templates/pages/${key}.html`,
                            title: key.charAt(0).toUpperCase() + key.slice(1),
                            navigation: true,
                            auth: true
                        };
                        pages[key] = page;
                    } else {
                        page = pages.home;
                        key = 'home';
                    }
                    html = `<li><a href="#" data-page="${key}">${page.title}</a></li>${html}`;
                });

                menu.setContent(html.trim());

                PD('li > a', menu.getElements()).listen('click', menuClick);
            });
    }

    static changePage(index) {
        const page = window.config.pages[index];

        if (page.auth && typeof PageHelper.prototype.token == 'undefined')
            return false;

        UIHelpers.Loading.show();

        PageHelper.prototype.index = index;

        Importer.importTemplate(page.template, PageHelper.prototype.mainElementPD)
            .then(() => {
                PageHelper.prototype.title.setContent(page.title);
                UIHelpers.Loading.close();
            });
    }

    static sectionItemWarning() {
        const data = PageHelper.prototype.data;
        const index = PageHelper.prototype.index;
        const itemsAdded = (typeof data[index] == 'undefined') ? 0 : data[index].length;

        PD('#items')
            .setContent(`You have added ${itemsAdded} items in this section`);
    }

    static setTable() {
        const index = PageHelper.prototype.index;
        const tbody = PD('table > tbody');
        const el = tbody.getElements();
        let html = '';

        PageHelper.prototype.data[index].forEach((data, i) => {
            html += `<tr><td>${data.degree}</td><td>${data.schoolName}</td>` + // this kind of string
                `<td><button class="btn tiny orange round" data-index="${i}">edit</button>` + // supports multiline
                `<button class="btn tiny red round" data-index="${i}">delete</button><td></tr>` // but means add extra text nodes
        });

        tbody.setContent(html);

        PD('button.orange', el).listen('click', showForm);
        PD('button.red', el).listen('click', showAlert);

        PageHelper.prototype.tbody = tbody;
    }

    static setAddNew() {
        PD('button#add_new').listen('click', addNewClick);
    }

    static setFormEvents() {
        const form = PD('.full-width-forms.hide');
        const element = form.getElements();
        const fields = PD('input,textarea', element).listen('change', markAsEdited);
        const btn = PD('button#save', element).listen('click', addItem);

        PageHelper.prototype.form = form;
        PageHelper.prototype.fields = fields;
        PageHelper.prototype.btn = btn;
    }

    static editItem (arrayPosition) {
        let data = {};
        let sendSave = true;
    
        PageHelper.prototype.fields.getElements().forEach(field => {
            if (field.value.length > 0)
                data[field.id] = field.value;
            else
                sendSave = false;
        });
    
        if (sendSave) {
            PageHelper.prototype.data[PageHelper.prototype.index][arrayPosition] = data;
    
            save();
        }
    }

    static deleteItem (arrayPositiion) {
        UIHelpers.Loading.close();
        PageHelper.prototype.data[PageHelper.prototype.index].splice(arrayPositiion, 1);
        save();
    }
}

export default PageHelper;