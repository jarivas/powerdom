document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        
        PD.Config.set({
            "title": "Documentation",
            "layout": "/templates/layout.html",
            "pages": {
                "default": {
                    "template": "templates/pages/default.html",
                    "title": "Home",
                    "navigation": true,
                    "default": true
                },
                "modules": {
                    "template": "templates/pages/modules.html",
                    "title": "Modules",
                    "navigation": true
                }
            }
        })

        PD.Pages.init()
    }
}