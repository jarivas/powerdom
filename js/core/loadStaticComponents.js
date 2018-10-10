const staticComponents = [
    'DialogComponent',
    'ModalComponent',
    'NotificationComponent',
    'LoadingComponent'
];

staticComponents.forEach(component => {
    let url = `components/static/${component}.js`;
    let createInstance = () => eval(`window.${component} = new ${component}();`);

    PD.loadJSClass(url, component, createInstance);
});