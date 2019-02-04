import { PowerDom, find, findAll } from '/powerdom/core/PowerDom.js';

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

        matches[1].match(splitMultiExport).forEach(exported => {
            replacingLine += `modules.${exported} = ${exported};\n`;
        });

    } else {
        throw `Not a valid url: ${url}`;
    }

    return code.replace(lineToReplace, replacingLine);
}

class Importer {

    static async importTemplate(url, targetElementSelector) {
        let targetElement = getTargetElement(targetElementSelector);
        let templateElement = null, html = '';

        if (templates.has(url)) {
            html = templates.get(url);
        } else {
            html = await Request.getRemoteText(url);
            templates.set(url, html);
        }

        templateElement = document.createElement("template");
        templateElement.insertAdjacentHTML('beforeend', html);
        targetElement.appendElement(templateElement);

        findAll('script', templateElement).forEach(script => {
            eval(script.textContent);
            script.remove();
        });

        targetElement.setContentMultipleElements(templateElement.childNodes);
        templateElement.remove();
    }

    static async importModule(url) {
        if (!modules.has(url))
            eval(await getCode(url));

        return modules.get(url);
    }
}

export default Importer;