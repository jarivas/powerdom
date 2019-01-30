const config = window.config;
const configDir = config.dir;
const coreDir = `${configDir}/core`;

const cssDependency = [
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
].concat(config.js);


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
    console.log('4th load PD extending core class files');
    loadClasses(config.extCore, loadExtendedCoreJs);
}

function loadExtendedCoreJs() {
    console.log('5th load PD extending core js tweak files');
    PD.loadMultipleJSFile(config.extCoreJs, initAfterCore);
}

function initAfterCore() {
    console.log('6th Initialization after core load');
    PD.apiUrl = window.config.apiUrl;

    PageManager.init();

    PD.fire('coreLoaded');

    ComponentTemplate.initComponents();
    PartialTemplate.initPartials();
}