import { PowerDom, select, selectAll } from '/powerdom/modules/PowerDom.js'
import Request from '/powerdom/modules/Request.js'
import Importer from '/powerdom/modules/Importer.js'
import { Notification, Loading, Modal, UIHelpers } from '/powerdom/modules/UIHelpers.js'
import Template from '/powerdom/modules/Template.js'
import Pages from '/powerdom/modules/Pages.js'

const app = {
    PowerDom: PowerDom,
    PD: PowerDom.getInstance,
    select: select,
    selectAll: selectAll,
    Request: Request,
    Importer: Importer,
    Notification: Notification,
    Loading: Loading,
    Modal: Modal,
    Template: Template,
    Pages: Pages
}

window.app = app

Importer.loadJSON('/powerdom/config.json').then(config => {
    const head = app.PD('head')

    app.config = config

    config.meta.forEach(meta => head.prepend(`<meta ${meta}>`))

    Importer.loadMultipleJs(config.js).then(() => {
        config.css.forEach(css => Importer.loadCss(css))

        UIHelpers.init()

        Template.parse(select('html')).then(app.Pages.init)
    })

})

