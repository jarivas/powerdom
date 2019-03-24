class Pages {
    static init() {
        Pages.prototype.mainElement = app.select(app.config.mainElementSelector)

        console.log(Pages.prototype.mainElement)

        Pages.go('default')
    }
    static go (index) {
        const config = app.config
        const pages = config.pages
        let page = null

        if(!index in pages)
            throw 'Invalid page index'

        app.Loading.show()

        page = pages[index]

        Pages.prototype.index = index

        app.Importer.importTemplate(page.template, Pages.prototype.mainElement)
            .then(() => {
                config.title = page.title
                app.Template.parse(Pages.prototype.mainElement)
                app.Loading.close()
            })
    }
}

export default Pages