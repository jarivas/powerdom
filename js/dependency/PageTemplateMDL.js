class PageTemplateMDL extends PageTemplate {

    /**
     * Processes the entry parameters passed to the page on change
     */    
    handleParameters(){
        const params = PageManager.getParams();

        if (params.hasOwnProperty('up'))
            window.location.hash = '#top';

        if (params.hasOwnProperty('section'))
            PD(`a[href="${params.section}"]`).fire('click');
    }

    /**
     * Executed right after the partials are loaded, typically to
     * retrieve data from the server based on filters
     */
    partialsLoaded() {
        componentHandler.upgradeAllRegistered();
    }
}