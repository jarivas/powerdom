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
                    "template": "templates/pages/home/tpl.html",
                    "module": "templates/pages/home/module.js",
                    "title": "Home",
                    "navigation": true,
                    "default": true
                },
                "layout": {
                    "template": "templates/pages/layout/tpl.html",
                    "title": "Layout",
                    "navigation": true,
                    "default": false
                }
            }
        })
        
        PD.Pages.init()
    }
}