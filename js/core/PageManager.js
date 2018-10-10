class PageManager {

    /**
     * Bootstraps the PageManager
     */
    static init() {
        PageManager.prototype.currentIndex = window.config.pages.findIndex(page => page.default);
        PageManager.prototype.data = [...window.config.pages];
        PageManager.prototype.mainElement = PD.find(window.config.mainElementSelector);
        PageManager.prototype.mainElementPD = PD(PageManager.prototype.mainElement);
        PageManager.prototype.dynamicClasses = new Map();
        PageManager.prototype.params = {}

        PageManager.setTitle(window.config.website);
    }

    /**
     * Set the current page title
     * @param {string} title
     */
    static setTitle(title){
        PD('title').setContent(title);
    }

    /**
     *  @param {string} html content
     */
    static setHtml(html){
        PageManager.prototype.mainElementPD.setContent(html);
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

        if(typeof params != 'undefined')
            PageManager.prototype.params = params;

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
        const main = PageManager.prototype.mainElement;
        const source = '/pages/';
        const className = page.className;
        const template = `${source}${className}.html`;
        const script = `${source}${className}.js`;
        const dynamicClasses = PageManager.prototype.dynamicClasses;
        const success = () => {
            PageManager.setHtml(dynamicClasses.get(className));
            PD.getInstance(className, main);
        };

        PageManager.setTitle(page.title);

        if (dynamicClasses.has(className)) {
            success();
        } else {
            PD.LoadTemplate(template, (html) => {
                dynamicClasses.set(className, html);

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
}
