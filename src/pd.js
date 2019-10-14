import Config from "./modules/Config"
import {select, selectAll, PowerDom} from "./modules/PowerDom"
import RequestHelper from "./modules/Request"
import State from "./modules/State"
import Countdown from "./modules/Countdown"

import './tags/pd-tpl'
import './tags/pd-modal'
import './tags/pd-page'

const PD = {
    $: PowerDom.$,
    Config,
    RequestHelper,
    select,
    selectAll,
    State,
    Countdown,
    Auth: {
        isAuth: () => {return true}
    }
}

window.PD = PD