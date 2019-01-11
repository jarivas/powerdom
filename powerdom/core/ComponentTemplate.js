class ComponentTemplate extends Template {
    /**
    * 
    * @param {Element|Node} nodeTarget 
    * @param {Element|Node|DocumentFragment} templateNode 
    * @param {string} loaded eventName
    * @param {string} changed eventName
    */
    constructor(nodeTarget, templateNode, loaded, changed) {
        const extraParams = (changed) ? { "changed": changed } : false;

        super(nodeTarget, templateNode, extraParams);

        PD.fire(loaded, this);
    }

    /**
     * Init the set where the loaded classes are stored
     */
    static initComponents() {
        ComponentTemplate.prototype.dynamicClasses = new Map();
    }

    /**
     * Scans for al the components in the DocumentFragment, generates the new html
     * replace them with the new html and return instances to each one of them
     * @param {Element|Node|DocumentFragment} templateNode  templateElement
     */
    static LoadComponents(templateNode) {
        templateNode.querySelectorAll('component').forEach(ComponentTemplate.loadComponent);
    }

    static loadComponent(component) {
        const data = component.attributes;
        const source = data.source.value;
        const loaded = data.loaded.value;
        const changed = data.hasOwnProperty('changed') ? data.changed.value : false;
        const className = data.className.value;
        const fileName = Template.getFilename(className, data);

        ComponentTemplate.loadComponentHelper(component, className, fileName, source, loaded, changed);
    }

    static loadComponentHelper(component, className, fileName, source, loaded, changed) {
        const dynamicClasses = ComponentTemplate.prototype.dynamicClasses;
        const successFunc = () => {
            const params = [
                component,
                dynamicClasses.get(fileName).cloneNode(true),
                loaded,
                changed
            ];

            PD.getInstance(className, params);
        };

        if (dynamicClasses.has(fileName)) {
            successFunc();
        } else {
            let template = `${source}${fileName}.html`;
            let script = `${source}${fileName}.js`;

            PD.LoadTemplate(template, (templateElement) => {
                dynamicClasses.set(fileName, templateElement);

                PD.loadJSClass(script, className, successFunc);
            });
        }
    }
}