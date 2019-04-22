document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        
        PD.Config.set({
            "title": "Demo Site",
            "layout": {
                "template": "/templates/layout/layout.html",
                "module": "/templates/layout/Layout.js"
            },
            "pages": {
                "default": {
                    "template": "templates/pages/home.html",
                    "title": "Home",
                    "navigation": true,
                    "default": true
                },
                "layout": {
                    "template": "templates/pages/layout.html",
                    "title": "Layout",
                    "navigation": true,
                    "default": false
                }
            }
        })
        
        PD.Pages.init()
    }
}