class Pages extends PageTemplateMDL {
    bind(){
        PD('a#config').listen('click', Pages.seeConfig);
        PD('a#partials').listen('click', Pages.seePartial);
    }

    static seeConfig(e){
        e.preventDefault();
        PageManager.changePage('Getting started', {section: "#config"});
    }

    static seePartial(e){
        e.preventDefault();
        PageManager.changePage('Partials', {up: true});
    }
}