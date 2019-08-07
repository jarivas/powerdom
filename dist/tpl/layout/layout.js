class Layout extends PD.Template {
    async process(){
        const $menu = this._['menu']
        let html = ''

        for(let [key, page] of Object.entries(PD.Config.get('pages'))) {
            html += `<li><a onclick="PD.Pages.go('${key}')" >${page.title}</a></li>`
        }

        $menu.setContent(html)
    }
}

export default Layout
