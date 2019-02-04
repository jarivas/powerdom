import { PowerDom, find, findAll } from '/powerdom/core/PowerDom.js';

class Importer {

    static async importHtml(url, targetElementSelector) {
        const selectorType = typeof targetElementSelector;
        let targetElement = null, templateElement = null, html = '';

        if (selectorType == 'undefined')
            targetElement = PD('body');
        else if (selectorType == 'string')
            selectorType = PD(targetElementSelector);
        else if ((selectorType == 'object') && (targetElementSelector instanceof PowerDom))
            targetElement = targetElementSelector;
        else
            throw 'Invalid selector';

        html = await Request.getRemoteText(url);

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
        const modules = Importer.getModules();
        const removeComments = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
        const exportDefault = /export\s+default\s+(\w*)/;
        const multiExport = /export\s*\{(.+)\}/;
        const splitMultiExport = /\w+/g;
        let lineToReplace = '', replacingLine = '', code = '';

        if (modules.has(url)) 
            return modules.get(url);
        
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
        
        eval(code.replace(lineToReplace, replacingLine));

        return modules.get(url);
    }

    static getModules() {
        if (!Importer.prototype.hasOwnProperty('modules'))
            Importer.prototype.modules = new Map();

        return Importer.prototype.modules;
    }
}

export default Importer;