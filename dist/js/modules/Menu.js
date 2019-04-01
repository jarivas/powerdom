class Menu {
    static build() {
        const pages = PD.Config.get().pages
        const $menu = PD.$('ul.menu')

        for (const [key, page] of Object.entries(pages)) {
            if(page.navigation) {
                const html = `<li ${page.default ? 'class="active"' : ''}>
                    <a href="#" data-page="${key}">${page.title}</a>
                </li>`
                $menu.prepend(html)
            }
        }
    }
}

export default Menu