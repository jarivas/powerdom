class Pages {
    static init() {
        Pages.prototype.mainElement = app.select(app.config.mainElementSelector)

        Pages.go('default')
    }
    static getPage(index) {
        const config = app.config
        const pages = config.pages
        let page = null

        if(index in pages)
            page = pages[index]

        return page
    }
    static navigate(page) {
        app.Loading.show()

        app.Importer.importTemplate(page.template, Pages.prototype.mainElement)
        .then(() => {
            app.config.title = page.title
            app.Template.parse(Pages.prototype.mainElement)
            app.Loading.close()
        })
    }
    static go (index) {
        const page = Pages.getPage(index)

        if(!page)
            throw `Invalid page index: ${index}`

        Pages.navigate(page)
    }
}

export default Pages