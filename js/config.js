window.config = {
    website: 'Examples',
    apiUrl: 'http://localhost:8080/',
    mainElementSelector: '.page-content',
    css: [
        '/css/vital.min.css',
        '/css/dialog-polyfill.css',
        '/css/UIHelpers.css'
    ],
    js: [
        '/js/dialog-polyfill.js'
    ],
    extCore: [
    ],
    pages: {
        default: {
            template: 'templates/pages/login.html',
            title: 'Log in',
            navigation: false,
            auth: false
        },
        home: {
            template: 'templates/pages/home.html',
            title: 'Home',
            navigation: true,
            auth: true
        }
    }
};