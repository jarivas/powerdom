document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        import('/js/config.js').then(config => {
            PD.Config.set(config.default)
            PD.Pages.init()
        })
    }
}
