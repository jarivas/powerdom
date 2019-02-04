import { PowerDom } from '/powerdom/core/PowerDom.js';
import Request from '/powerdom/core/Request.js';
import Importer from '/powerdom/core/Importer.js';

const PD = PowerDom.getInstance;

window.PD = PD;
window.Request = Request;
window.Importer = Importer;

Importer.importTemplate('/powerdom/templates/layout.html', PD('body'));