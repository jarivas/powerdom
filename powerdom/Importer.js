import { PowerDom, selectAll } from '/powerdom/PowerDom.js';

const templates = new Map();
const modules = new Map();

function getTargetElement(targetElementSelector) {
    const selectorType = typeof targetElementSelector;
    let targetElement = '';

    if (selectorType == 'undefined')
        targetElement = PD('body');
    else if (selectorType == 'string')
        selectorType = PD(targetElementSelector);
    else if ((selectorType == 'object') && (targetElementSelector instanceof PowerDom))
        targetElement = targetElementSelector;
    else
        throw 'Invalid selector';

    return targetElement;
}

async function getCode(url) {
    const removeComments = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
    const exportDefault = /export\s+default\s+(\w*)/;
    const multiExport = /export\s*\{(.+)\}/;
    const splitMultiExport = /\w+/g;
    let lineToReplace = '', replacingLine = '', code = '';

    code = await Request.getRemoteText(url);
    code = code.replace(removeComments, '');

    if (exportDefault.test(code)) {
        const matches = code.match(exportDefault);
        lineToReplace = matches[0];
        replacingLine = `modules.set('${url}', ${matches[1]});\n`;

    } else if (multiExport.test(code)) {
        const matches = code.match(multiExport);

        lineToReplace = matches[0];
        replacingLine = 'const m = {};\n';

        matches[1].match(splitMultiExport).forEach(exported => {
            replacingLine += `m.${exported} = ${exported};\n`;
        });

        replacingLine += `modules.set('${url}', m);\n`;
    } else {
        throw `Not a valid url: ${url}`;
    }

    code = code.replace(lineToReplace, replacingLine);

    return appendJsToHead(url, code);
}

function appendJsToHead(url, code) {
    const temp = url.split('/');
    return `${code} //# sourceURL=${temp.pop()}`;
}

class Importer {

    static async importTemplate(url, targetElementSelector) {
        let targetElement = getTargetElement(targetElementSelector);
        let templateElement = null, html = '', js = '';

        if (templates.has(url)) {
            html = templates.get(url);
        } else {
            html = await Request.getRemoteText(url);
            templates.set(url, html);
        }

        targetElement.empty();
        templateElement = document.createElement("template");
        templateElement.insertAdjacentHTML('beforeend', html);
        targetElement.appendElement(templateElement);

        selectAll('script', templateElement).forEach(script => {
            js += script.textContent;
            script.remove();
        });

        eval(js);

        targetElement.setContentMultipleElements(templateElement.childNodes);
        templateElement.remove();
    }

    static async importModule(url) {
        if (!modules.has(url)) {
            eval(await getCode(url));
        }

        return modules.get(url);
    }

    static loadCss(url) {
        const head = document.head;
        const css = document.createElement('link');
        let cssAdded = false;

        css.href = url;
        css.type = 'text/css';
        css.rel = 'stylesheet';

        css.onload = css.onreadystatechange = function () {
            if (!cssAdded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                cssAdded = true;
                css.onload = css.onreadystatechange = null;
            }
        };

        head.appendChild(css);
    }

    static async loadMultipleJs(files) {
        files.forEach(url => {
            Request.getRemoteText(url)
                .then((code) => eval(appendJsToHead(url, code)));
        });
    }
}

export default Importer;