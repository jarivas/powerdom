class PageTemplateMDL extends PageTemplate {

    handleAnchorParameters() {
        const params = PageManager.getParams();

        if (params.hasOwnProperty('section'))
            PD(`a[href="${params.section}"]`).fire('click');
        else
            PageTemplateMDL.moveUp();
    }

    partialsLoaded() {
        componentHandler.upgradeAllRegistered();
    }

    static moveUp() {
        window.location.hash = '#top';
        window.location.hash = '';
    }
}