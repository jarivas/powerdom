document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        
        PD.Config.set({
            "title": "Demo Site",
            "layout": "/templates/layout.html",
            "pages": {
                "default": {
                    "template": "templates/pages/default.html",
                    "title": "Home",
                    "navigation": false
                },
                "pData": {
                    "template": "templates/pages/personal-data.html",
                    "title": "Personal Data",
                    "navigation": true,
                    "default": true
                }
            }
        })

        PD.Pages.init()
    }
}