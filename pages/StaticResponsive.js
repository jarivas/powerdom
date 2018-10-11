class Static extends PageTemplateMDL {
    bind(){
        PD('.mdl-menu > li').listen('click', Static.click);
    }

    static click(){
        window.location.hash = PD(this).getData('section');
    }
}