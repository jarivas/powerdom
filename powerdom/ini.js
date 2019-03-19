import { PowerDom, select, selectAll } from '/powerdom/PowerDom.js';
import Request from '/powerdom/Request.js';
import Importer from '/powerdom/Importer.js';

const app = {
    PowerDom: PowerDom,
    PD: PowerDom.getInstance,
    select: select,
    selectAll: selectAll,
    Request: Request,
    Importer: Importer
};

window.app = app;

Importer.init();

Importer.loadJSON('/powerdom/config.json').then(config => {
    app.config = config;

    Importer.loadMultipleJs(config.js).then(() => {
        const layout = config.layout;

        config.css.forEach(css => Importer.loadCss(css));

        Importer.importTemplate(layout.template, app.PD(layout.selector))
    });
})

