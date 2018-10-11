class ComponentTemplate extends Template {
    /**
     * Build the new html, insert it on the dom and triggers a
     * partialLoadedClassName event
     */
    construct() {
        super.construct();
        PD.fire(this.loaded, this);
    }

    /**
     * Set ups the instance with the required data
     * @param {Element|Node} componentEl
     */
    init(componentEl) {
        this.rootNode = componentEl.firstChild;
        this.nodeTarget = componentEl;
        this.loaded = componentEl.loaded;
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
     * @param {DocumentFragment} rootNodeContent templateElement.content
     */
    static LoadComponents(rootNodeContent) {
        let data = null;
        let source = '';
        let loaded = '';
        let className = '';
        let fileName = '';

        rootNodeContent.querySelectorAll('component').forEach(component => {
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
            PD.setContent(component, dynamicClasses.get(fileName));
            component.loaded = loaded
            PD.getInstance(className, component);
        };

        if (dynamicClasses.has(fileName)) {
            successFunc();
        } else {
            let template = `${source}${fileName}.html`;
            let script = `${source}${fileName}.js`;

            PD.LoadTemplate(template, (html) => {
                dynamicClasses.set(fileName, html);

                PD.loadJSClass(script, className, successFunc);
            });
        }
    }
}