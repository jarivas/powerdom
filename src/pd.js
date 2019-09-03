import Config from "./modules/Config"
import {select, selectAll, PowerDom} from "./modules/PowerDom"
import RequestHelper from "./modules/Request"

import './tags/pd-tpl'
import './tags/pd-modal'
import './tags/pd-page'

const PD = {
    $: PowerDom.$,
    Config,
    RequestHelper,
    select,
    selectAll,
    Auth: {
        isAuth: () => {return true}
    }
}

window.PD = PD