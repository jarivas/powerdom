window.config = {
    website: 'Examples',
    apiUrl: 'http://localhost:8080/',
    dir: 'powerdom',
    templatesDir: 'templates',
    mainElementSelector: '.page-content',
    css: [
        '/css/vital.min.css',
        '/css/dialog-polyfill.css'
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
            navigation: false
        },
        personalData: {
            template: 'templates/pages/personal.html',
            title: 'Personal Data',
            navigation: true
        }
    },
    defaultLogin: {
        username: 'jose',
        password: 'hola'
    }
};