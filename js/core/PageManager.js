class PageManager {

    /**
     * Bootstraps the PageManager
     */
    static init() {
        PageManager.prototype.currentIndex = window.config.pages.findIndex(page => page.default);
        PageManager.prototype.data = [...window.config.pages];
        PageManager.prototype.mainElement = PD.find(window.config.mainElementSelector);
        PageManager.prototype.titleElement = PD.find('head > title');
        PageManager.prototype.dynamicClasses = new Map();
        PageManager.prototype.params = {}

        PageManager.setTitle(window.config.website);
    }

    /**
     * Set the current page title
     * @param {string} title
     */
    static setTitle(title){
        PD.setContent(PageManager.prototype.titleElement, title);
    }

    /**
     *  @param {string} html
     */
    static setContent(html){
        PD.setContent(PageManager.prototype.mainElement, html);
     }

     /**
      *  @param {Document|DocumentFragment|Element} element
      */
     static setContentElement(element){
        PD.setContentElement(PageManager.prototype.mainElement, element);
     }

    /**
     * Changes the page using the numeric index of pages
     * @param {number} index
     */
    static setCurrentIndex(index) {
        if (index >= 0 && index < PageManager.prototype.data.length) {
            PageManager.prototype.currentIndex = index;
            PageManager.loadCurrentPage();
        }
    }

    /**
     * Changes the page
     * @param {string} title the exact title of the page
     * @param {object} [params] params like get params
     */
    static changePage(title, params){
        const index = PageManager.prototype.data.findIndex(page => page.title == title);
        
        PageManager.prototype.params = (typeof params != 'undefined') ? params : {};

        PageManager.setCurrentIndex(index);
    }
    
    /**
     * Simulate the get params, those params are set on
     * changePage, and after retrieved are cleaned
     * @returns {object}
     */
    static getParams() {
        const params = PageManager.prototype.params;
        
        PageManager.prototype.params = {};

        return params;
    }

    /**
     * Get the current page info
     * @returns {{currentIndex: number, data: object}} Current page info
     */
    static getInfo() {
        return {
            currentIndex: PageManager.prototype.currentIndex,
            data: PageManager.prototype.data
        };
    }

    /**
     * Renders the processed template for the current index on the mainElement
     */
    static loadCurrentPage() {
        const page = PageManager.prototype.data[PageManager.prototype.currentIndex];
        const source = 'pages/';
        const className = page.className;
        const fileName = Template.getFilename(className, page);
        const template = `${source}${fileName}.html`;
        const script = `${source}${fileName}.js`;
        const extraParams = (page.hasOwnProperty('extraParams') ) ? page.extraParams : null;

        PageManager.setTitle(page.title);

        PageManager.loadCurrentPageHelper(className, fileName, template, script, extraParams);
    }

    static loadCurrentPageHelper(className, fileName, template, script, extraParams){
        const dynamicClasses = PageManager.prototype.dynamicClasses;
        const success = () => {
            const params = [
                PageManager.prototype.mainElement,
                dynamicClasses.get(fileName).cloneNode(true),
                extraParams
            ];

            PD.getInstance(className, params);
        };

        if (dynamicClasses.has(fileName)) {
            success();
        } else {
            PD.LoadTemplate(template, (templateElement) => {
                dynamicClasses.set(fileName, templateElement);

                PD.loadJSClass(script, className, success);
            });
        }
    }

    /**
     * Get the PageTemplate instance of the current page
     * @returns {object} current page instance
     */
    static getPageInstance(){
        return PageManager.prototype.data[PageManager.prototype.currentIndex].instance;
    }

    /**
     * Changes the pages's node target
     * @param {string} selector 
     */
    static changeMainElement(selector){
        console.log('Changing Main Element notice');
        PageManager.prototype.mainElement =  PD.find(selector);
    }
}