class Layout extends PD.Template {
    navClick(e){
        e.preventDefault()
        const $link = PD.$(e.target)
        PD.Pages.go($link.getData('page'))
    }
}

export default Layout
