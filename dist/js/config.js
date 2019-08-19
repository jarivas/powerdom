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
        },
        certification: {
            template: "pages/certification.html",
            title: "Certifications",
            navigation: true,
            auth: true
        },
        education: {
            template: "pages/education.html",
            title: "Education",
            navigation: true,
            auth: true
        },
        language: {
            template: "pages/language.html",
            title: "Language",
            navigation: true,
            auth: true
        },
        personalData: {
            template: "pages/personal-data.html",
            title: "PersonalData",
            navigation: true,
            auth: true
        },
        position: {
            template: "pages/position.html",
            title: "Position",
            navigation: true,
            auth: true
        },
        post: {
            template: "pages/post.html",
            title: "Post",
            navigation: true,
            auth: true
        },
        skill: {
            template: "pages/skill.html",
            title: "Skill",
            navigation: true,
            auth: true
        },
        social: {
            template: "pages/social.html",
            title: "Social",
            navigation: true,
            auth: true
        }
    },
    tpl: {
        dir: "/tpl/"
    }
}
