class Menu {
    static build() {
        const pages = PD.Config.get().pages
        const menu = PD.select('ul.menu')
        const $menu = PD.$(menu)

        for (const [key, page] of Object.entries(pages)) {
            if(page.navigation) {
                const html = `<li ${page.default ? 'class="active"' : ''}>
                    <a href="#" data-index="${key}">${page.title}</a>
                </li>`
                $menu.prepend(html)
            }
        }

        Menu.prototype.$li = PD.$('li', menu);

        PD.$('a', menu).listen('click', Menu.changePage)
    }

    static changePage(e){
        const el = e.target
        const index = el.dataset.index

        e.preventDefault()

        PD.Pages.go(index)

        Menu.prototype.$li.removeClass('active')

        PD.$(el.parentNode).addClass('active')

    }
}

class Layout {
    static init(){
        Menu.build()
    }
}

export default Layout