class Home extends PageTemplateMDL {
    bind() {
        //Selects all the a elements inside the template
        //and adds a listener on click event 
        PD('a', this.nodeTarget).listen('click', Home.click);
    }
    
    /**
     * Even if is an static function, the scope is the a tag
     * static does not alter the normal js way of working
     * @param {object} e 
     */
    static click(e) {
        e.preventDefault();

        console.log(this);
        
        const el = PD(this);
        const title = el.getData('title');

        PageManager.changePage(title);
    }
}