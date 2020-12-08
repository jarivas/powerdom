import Config from "./modules/Config"
import {select, selectAll, PowerDom} from "./modules/PowerDom"
import RequestHelper from "./modules/Request"
import State from "./modules/State"
import Countdown from "./modules/Countdown"

import './custom-elements/pd-tpl'
import './custom-elements/pd-page'

const PD = {
    $: PowerDom.$,
    Config,
    RequestHelper,
    select,
    selectAll,
    State,
    Countdown,
    Auth: {
        isAuth: () => {return false}
    }
}

window.PD = PD