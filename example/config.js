export default {
    title: "CV Admin",
    apiUrl: "http://cv.local",
    mainElementSelector: "main",
    dev: true,
    pages: {
        default: {
            template: "/pages/login.html",
            module: "/pages/login.js",
            title: "Login",
            navigation: false,
            auth: false
        },
    }
}