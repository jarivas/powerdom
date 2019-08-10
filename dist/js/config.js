export default {
    title: "Portfolio Admin",
    apiUrl: "http://localhost:8080/",
    mainElementSelector: ".page-content",
    dev: true,
    pages: {
        default: {
            template: "pages/login.html",
            module: "pages/login.js",
            title: "Login",
            navigation: false,
            auth: false
        },
        home: {
            template: "pages/home.html",
            module: "pages/home.js",
            title: "Home",
            navigation: true,
            auth: true
        }
    },
    tpl: {
        dir: "/tpl/"
    }
}
