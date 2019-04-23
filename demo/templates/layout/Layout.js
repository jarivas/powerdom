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

        PD.$('a', menu).listen('click', Menu.click)
    }

    static click(e){
        e.preventDefault()

        Menu.changePage(e.target.dataset.index)
    }

    static changePage(index){
        const el = Menu.prototype.$li.removeClass('active')
        .select(`a[data-index="${index}"]`)

        PD.Pages.go(index)

        PD.$(el.parentNode).addClass('active')
    }
}

class Layout {
    static init(){
        Menu.build()
        PD.menu = Menu
    }
}

export default Layout