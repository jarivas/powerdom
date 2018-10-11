class Basic extends PageTemplateMDL {
    bind(){
        PD('.mdl-menu > li').listen('click', Basic.click);
    }

    static click(){
        window.location.hash = PD(this).getData('section');
    }
}