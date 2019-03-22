class Template {
    static loadAll(element) {
        app.selectAll('tpl', element).forEach(tpl => {
            const url = tpl.getAttribute('src')
    
            app.Importer.importTemplate(url, tpl, true)
        });
    }
}

export default Template