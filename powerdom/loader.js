const config = window.config;
const configDir = config.dir;
const coreDir = `${configDir}/core`;
const staticComponentsDir = `${configDir}/components/static`;

const cssDependency = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    `${coreDir}/css/dialog-polyfill.css`,
    `${coreDir}/css/material.css`,
    `${coreDir}/css/core.css`,
    `${coreDir}/css/style.css`
].concat(config.css);

const preCoreClasses = [
    'PowerDom',
    'PageManager',
    'Template'
];

const coreClasses = [
    'PageTemplate',
    'ComponentTemplate',
    'PartialTemplate',
    'PageTemplateMDL'
];

const jsDependency = [
    `${coreDir}/js/material.js`,
    `${coreDir}/js/dialog-polyfill.js`
].concat(config.js);

const staticComponents = [
    'DialogComponent',
    'ModalComponent',
    'NotificationComponent',
    'LoadingComponent'
];

console.log('Load PD basics');
loadClasses(preCoreClasses, loadDependency);

//functions
function loadDependency() {
    console.log('2nd load external non PD related');
    PD.listen('partialsInitialized', PageManager.loadCurrentPage);

    cssDependency.forEach(file => loadCSS(file));

    PD.loadMultipleJSFile(jsDependency, loadCore);
}

function loadCSS(file) {
    const head = PD('head');
    const css = document.createElement('link');
    let cssAdded = false;

    css.href = file;
    css.type = 'text/css';
    css.rel = 'stylesheet';

    css.onload = css.onreadystatechange = function () {
        if (!cssAdded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'))
        {
            cssAdded = true;
            css.onload = css.onreadystatechange = null;
        }
    };

    head.appendElement(css);
}

function loadClasses(classArray, callback) {
    const files = [];
    const classNames = [];

    classArray.forEach(c => {
        const fileName = `${coreDir}/${c}.js`;
        
        console.log(fileName);
        files.push(fileName);
        classNames.push(c);
    });

    PD.loadMultipleJSClass(files, classNames, callback);
}

function loadCore() {
    console.log('3rd load PD core files');
    loadClasses(coreClasses, loadExtendedCore);
}

function loadExtendedCore() {
    console.log('4th load PD extended core files');
    loadClasses(config.extCore, initAfterCore);
}

function initAfterCore() {
    console.log('5th Initialization after core load');
    PD.apiUrl = window.config.apiUrl;

    PageManager.init();

    PD.fire('coreLoaded');

    staticComponents.forEach(component => {
        let url = `${staticComponentsDir}/${component}.js`;
        let createInstance = () => eval(`window.${component} = new ${component}();`);

        PD.loadJSClass(url, component, createInstance);
    });

    ComponentTemplate.initComponents();
    PartialTemplate.initPartials();
}