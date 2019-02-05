import { PowerDom, select, selectAll } from '/powerdom/PowerDom.js';
import Request from '/powerdom/Request.js';
import Importer from '/powerdom/Importer.js';

const PD = PowerDom.getInstance;

window.PD = PD;
window.select = select;
window.selectAll = selectAll;
window.Request = Request;
window.Importer = Importer;

window.config.css.forEach(css => Importer.loadCss(css));

Importer.loadMultipleJs(window.config.js)
    .then(() => Importer.importTemplate('/templates/layout.html', PD('body')));