import Config from './modules/Config.js'
import { PowerDom, select, selectAll } from './modules/PowerDom.js'
import Request from './modules/Request.js'
import Importer from './modules/Importer.js'
import { Notification, Loading, Modal } from './modules/UIHelpers.js'
import Template from './modules/Template.js'
import Pages from './modules/Pages.js'
import {State, CountDown} from './modules/State.js'


/**
 * An Object that contains all the modules from the framework,
 * check the docs for better understanding
 */
window.PD = {
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
    Config,
    State,
    CountDown,
    Modules: {
        Auth: {
            isAuth: () => {return true}
        }
    }
}
