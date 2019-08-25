import Config from "./modules/Config"
import Request from "./modules/Request"
import Template from "./modules/Template"
import {select, selectAll, PowerDom} from "./modules/PowerDom"

import './tags/pd-tpl'

const PD = {
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