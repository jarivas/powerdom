import Config from './src/modules/Config.js'
import { PowerDom, select, selectAll } from './src/modules/PowerDom.js'
import Request from './src/modules/Request.js'
import Importer from './src/modules/Importer.js'
import { Notification, Loading, Modal } from './src/modules/UIHelpers.js'
import Template from './src/modules/Template.js'
import Pages from './src/modules/Pages.js'

const PD = {
    $: PowerDom.getInstance,
    select,
    selectAll,
    Request,
    Importer,
    Notification,
    Loading,
    Modal,
    Template,
    Pages,
    Config
}

export default PD