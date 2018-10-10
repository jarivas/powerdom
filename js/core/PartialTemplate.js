class PartialTemplate extends Template {
    /**
     * Build the new html, insert it on the dom and triggers a
     * partialLoadedClassName event
     */
    construct() {
        this.listen();
        PartialTemplate.referenceElements(this.rootNode.content, this.constructor.name);
        super.construct();
        PD.fire(`partialLoaded${this.constructor.name}`);
    }

    /**
     * Set ups the instance with the required data
     * @param {Element|Node} partialEl
     */
    init(partialEl) {
        this.rootNode = partialEl.firstChild;
        this.nodeTarget = partialEl;

        if (partialEl.hasOwnProperty('changedEvent'))
            this.changedEvent = partialEl.changedEvent;
    }

    /**
     * Set the listeners in case the partial has to wait for a signal
     */
    listen() {}

    /**
     * insert the processed template it on the dom 
     */
    attach() {
        this.replace();
    }

    /**
     * Auto creates static references inside the class to elements
     * 
     * actionableElement will be the attribute used in the elements that you
     * want to set events or use / set their value, content, css classes. Also
     * you can add a listen attribute in order to set automatically the events
     * listen="keydown:validateKey,keyup:validateDates,change:changeFilters"
     * 
     * reference will be the attribute used just to link the node to
     * the classs
     * @param {DocumentFragment} rootNodeContent templateElement.content
     * @param {string} className the class target
     */
    static referenceElements(rootNodeContent, className) {
        rootNodeContent.querySelectorAll('[actionableElement]')
            .forEach(el => PartialTemplate.actionableElement(el, className));

        rootNodeContent.querySelectorAll('[referenceElement]')
            .forEach(el => eval(`${className}.prototype.${el.attributes.referenceElement.value} = el;`));
    }

    /**
     * referenceElements Helper method, responsable of actionableElement and listen parts
     * @param {Element|Node} el the element where the actionableElement was pressent
     * @param {string} className the class target
     */
    static actionableElement(el, className) {
        const reference = `${className}.prototype.${el.attributes.actionableElement.value}`;

        eval(`${reference} = PD(el);`);

        if (el.attributes.hasOwnProperty('listen')) {
            el.attributes.listen.value.split(',').forEach(event => {
                event = event.split(':');
                eval(`${reference}.listen("${event[0]}", ${className}.${event[1]})`)
            });
        }
    }

    /**
     * Get a reference to the actionable that has that id
     * @param {string} id 
     */
    static getActionable(id) {
        return eval(`${this.name}.prototype.${id}`);
    }

    /**
     * Init the partials scanning in the body tag, generates the html
     * for template and replace them before any page is loaded
     */
    static initPartials() {
        PartialTemplate.prototype.dynamicClasses = new Map();

        PartialTemplate.loadPartials('partialsInitialized');
    }

    /**
     * Scans for al the partials in the dom, generates the new html
     * and replace them.
     * @param {string} event the event triggered when is ready
     * @param {function} [pagePartialsLoaded] check PageTemplate.partialsLoaded
     */
    static loadPartials(event, pagePartialsLoaded) {
        let promises = [];

        document.querySelectorAll('partial').forEach(partial =>
            promises.push(PartialTemplate.loadPartial(partial))
        );

        Promise.all(promises).then((values) => {
            console.log(event, values);
            PD.fire(event);

            if (typeof pagePartialsLoaded != 'undefined')
                pagePartialsLoaded();
        });
    }

    /**
     * Generates the new html for the element and gets replaced
     * @param {Element|Node} partial 
     */
    static loadPartial(partial) {
        const data = partial.attributes;
        const source = data.source.value;
        const changed = data.hasOwnProperty('changed') ? data.changed.value : false;
        let className = data.className.value;
        let fileName = className;
        let template = '';
        let script = '';

        if (data.hasOwnProperty('responsive')) {
            data.responsive.value.split(',').forEach(mediaFileName => {
                mediaFileName = mediaFileName.split('|');

                if (window.matchMedia(mediaFileName[0]).matches)
                    fileName = mediaFileName[1];
            });
        }

        template = `${source}${fileName}.html`;
        script = `${source}${fileName}.js`;

        return PartialTemplate.loadPartialHelper(className, fileName, changed, partial, template, script);
    }

    static loadPartialHelper(className, fileName, changed, partial, template, script) {
        const dynamicClasses = PartialTemplate.prototype.dynamicClasses;
        let successFunc = null;

        return new Promise((resolve, reject) => {
            successFunc = () => {
                partial.innerHTML = dynamicClasses.get(fileName);

                if (changed)
                    partial.changedEvent = changed;

                PD.getInstance(className, partial);
                resolve(className);
            };

            if (dynamicClasses.has(fileName)) {
                successFunc();
            } else {
                PD.LoadTemplate(template, (html) => {
                    dynamicClasses.set(fileName, html);

                    PD.loadJSClass(script, className, successFunc);
                });
            }
        });
    }
}