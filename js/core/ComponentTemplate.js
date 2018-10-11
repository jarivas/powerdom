class ComponentTemplate extends Template {
    /**
    * 
    * @param {Element|Node} nodeTarget 
    * @param {Element|Node|DocumentFragment} templateNode 
    * @param {string} loaded eventName
    */
    constructor(nodeTarget, templateNode, loaded) {
        super(nodeTarget, templateNode);
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
        let data = null;
        let source = '';
        let loaded = '';
        let className = '';
        let fileName = '';

        templateNode.querySelectorAll('component').forEach(component => {
            data = component.attributes;
            source = data.source.value;
            loaded = data.loaded.value;
            className = data.className.value;
            fileName = className;

            if (data.hasOwnProperty('responsive')) {
                data.responsive.value.split(',').forEach(mediaFileName => {
                    mediaFileName = mediaFileName.split('|');
    
                    if (window.matchMedia(mediaFileName[0]).matches)
                        fileName = mediaFileName[1];
                });
            }

            ComponentTemplate.loadComponent(component, className, fileName, source, loaded);
        });
    }

    static loadComponent(component, className, fileName, source, loaded) {
        const dynamicClasses = ComponentTemplate.prototype.dynamicClasses;
        const successFunc = () => {
            const params = [
                component,
                dynamicClasses.get(fileName).cloneNode(true),
                loaded
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