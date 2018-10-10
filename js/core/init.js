function loadCore() {
    PD.apiUrl = window.config.apiUrl;

    PageManager.init();

    PD.fire('coreLoaded');

    console.log('coreLoaded');
}

function initAfterCore() {
    ComponentTemplate.initComponents();
    PartialTemplate.initPartials();
}

function lateDependencies() {
    PD.loadJSFile('js/dependency/material.js', PageManager.loadCurrentPage);
}

PD.listen('dependeciesLoaded', e => {
    //Your code here

    loadCore();//Do not delete
});

PD.listen('coreLoaded', e => {
    //Your code here

    initAfterCore();//Do not delete
});

PD.listen('partialsInitialized', e => {
    //Your code here

    lateDependencies();//Do not delete
});