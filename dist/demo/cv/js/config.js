export default {
    title: "Portfolio Frontend",
    apiUrl: "http://localhost:8080/",
    dev: true,
    pages: {
        default: {
            template: "/pages/index.html",
            module: "/pages/index.js",
            title: "My CV",
            navigation: false,
            auth: false
        }
    }
}
