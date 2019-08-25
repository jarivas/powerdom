function generatePages() {
    const result = []
    const pages = PD.Config.get('pages')

    for (let [key, data] of Object.entries(pages)) {
        if (data.navigation) {
            result.push({key: key, title: data.title})
        }
    }

    return result
}

function navClick(e) {
    e.preventDefault()
    const $link = PD.$(e.target)
    PD.Pages.go($link.getData('page'))
}

export {generatePages, navClick}
