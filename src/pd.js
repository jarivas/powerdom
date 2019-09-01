import Config from "./modules/Config"
import Request from "./modules/Request"
import Template from "./modules/Template"
import {select, selectAll, PowerDom} from "./modules/PowerDom"

import './tags/pd-tpl'
import './tags/pd-modal'
import './tags/pd-page'

const PD = {
    $: PowerDom.$,
    Config,
    Request,
    Template,
    select,
    selectAll,
    PowerDom,
    Modules: {
        Auth: {
            isAuth: () => {return true}
        }
    }
}

window.PD = PD