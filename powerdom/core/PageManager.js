class PageManager {

    /**
     * Bootstraps the PageManager
     */
    static init() {
        const pManager = PageManager.prototype;
        
        pManager.currentIndex = window.config.pages.findIndex(page => page.default);
        pManager.data = [...window.config.pages];
        pManager.mainElement = PD.find(window.config.mainElementSelector);
        pManager.titleElement = PD.find('head > title');
        pManager.dynamicClasses = new Map();
        pManager.params = {};
        pManager.instance = null;

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
        const pManager = PageManager.prototype;
        const index = pManager.data.findIndex(page => page.title == title);
        
        pManager.params = (typeof params != 'undefined') ? params : {};

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
        const source = `${window.config.dir}/pages/`;
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
            const pManager = PageManager.prototype;
            const params = [
                pManager.mainElement,
                dynamicClasses.get(fileName).cloneNode(true),
                extraParams
            ];

            pManager.instance = PD.getInstance(className, params);
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
        return PageManager.prototype.instance;
    }

    /**
     * Changes the pages's node target
     * @param {string} selector 
     */
    static changeMainElement(selector){
        console.log('Changing Main Element notice');
        PageManager.prototype.mainElement = PD.find(selector);
    }
}