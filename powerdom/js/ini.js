import { PowerDom, select, selectAll } from '/powerdom/modules/PowerDom.js'
import Request from '/powerdom/modules/Request.js'
import Importer from '/powerdom/modules/Importer.js'
import { Notification, Loading, Modal, UIHelpers } from '/powerdom/modules/UIHelpers.js'
import Template from '/powerdom/modules/Template.js'

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
    Template: Template
}

window.app = app

Importer.loadJSON('/powerdom/config.json').then(config => {
    app.config = config

    Importer.loadMultipleJs(config.js).then(() => {
        config.css.forEach(css => Importer.loadCss(css))

        UIHelpers.init()

        Template.loadAll()
    })

})

