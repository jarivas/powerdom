const helper = {
    DEFAULT_SELECTOR: '[linkd]',
    ATTR_VAL: 'val',
    ATTR_REF: 'ref',
    ATTR_LISTEN: 'listen',
    attrSelectors: [],
    proxiedObjectsFn: new Map(),
    process_listen_helper: function(strListener, el){
        const [event, callback] = strListener.split(':')

        app.PD(el).listen(event, window.eval(callback))
    },
    process_listen: function(el){
        const strListeners = el.getAttribute(helper.ATTR_LISTEN)

        strListeners.split(",").forEach(strListener => helper.process_listen_helper(strListener, el))
    },
    valueSetter: function (el, value) {
        let formInput = false

        switch(el.tagName){
            case "INPUT": 
            case "SELECT": el.value = value
                formInput = true
            break
            default: app.PD(el).setContent(value)
        }

        return formInput
    },
    process_ref_helper_prepare: function (strVar) {
        let prop = null,
            parentKey = '',
            parentObj = null

        strVar = strVar.replace('window.', '')

        if (strVar.includes('.')) {
            const arrayVar = strVar.split('.')

            prop = arrayVar[arrayVar.length - 1]
            parentKey = strVar.replace(`.${prop}`, '')
            parentObj = window[arrayVar[0]]

            for (let i = 1; i < arrayVar.length - 1 ; ++i)
                parentObj = parentObj[arrayVar[i]]
        } else {
            prop = strVar
            parentKey = 'window'
            parentObj = window
        }

        return [prop, parentKey, parentObj]
    },
    process_ref_helper_proxy: function (prop, parentKey, el) {
        let proxyFunctions

        if (helper.proxiedObjectsFn.has(parentKey)) {
            proxyFunctions = helper.proxiedObjectsFn.get(parentKey)
        } else {
            proxyFunctions = []

            const handler = {
                set(o, p, v) {
                    proxyFunctions.forEach(proxyFunction => proxyFunction(p, v))

                    return Reflect.set(...arguments);
                }
            }

            eval(`${parentKey} = new Proxy(${parentKey}, handler)`)

            helper.proxiedObjectsFn.set(parentKey, proxyFunctions)
        }

        proxyFunctions.push((property, value) => {
            if (property == prop)
                helper.valueSetter(el, value)
        })
    },
    process_ref: function (el) {
        const strVar = el.getAttribute(helper.ATTR_REF)
        const prepared = helper.process_ref_helper_prepare(strVar)
        const [prop, parentKey, parentObj] = prepared
        let formInput = false

        helper.process_ref_helper_proxy(prop, parentKey, el)
        formInput = helper.valueSetter(el, parentObj[prop])

        if(formInput){
            app.PD(el).listen('change', (e) => parentObj[prop] = e.target.value)
        }
    },
    process_val: function(el) {
        const strVar = el.getAttribute(helper.ATTR_VAL).replace('window.', '')
        let value = null

        if (strVar.includes('.')) {
            const arrayVar = strVar.split('.')

            value = window[arrayVar[0]]
            for (let i = 1; i < arrayVar.length ; ++i)
                value = value[arrayVar[i]]
        } else {
            value = window[strVar]
        }

        helper.valueSetter(el, value)
    },
    process: function (element) {
        app.selectAll(helper.DEFAULT_SELECTOR, element).forEach(el => {
            helper.attrSelectors.forEach(attr => {
                attr = helper[attr]

                if (el.hasAttribute(attr))
                    helper[`process_${attr}`](el)
            })

        })
    }
}

helper.attrSelectors = Object.keys(helper).filter(key => key.startsWith('ATTR_'))

class Template {
    static async parse(element) {
        helper.process(element)
        
        await Template.loadAll(element)
    }

    static async load(tpl) {
        const url = tpl.getAttribute('src')

        await app.Importer.importTemplate(url, tpl, true)

        helper.process(tpl)
    }

    static async loadAll(element) {
        const tpls = app.selectAll('tpl', element)

        for(let i = 0; i < tpls.length; ++i)
            await Template.load(tpls[i])
    }
}

export default Template