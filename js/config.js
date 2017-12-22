window.config = {
    website: "Website",
    apiUrl: "api.php",
    pages: [
        {
            title: 'Home',
            path: 'pages/home.html',
            default: true,
            onload: (path) => { return new Home(path);},
            instance: null
        },
        {
            title: 'Page1',
            path: 'pages/page1.html',
            onload: (path) => { return new Page1(path);},
            instance: null
        }
    ]
};