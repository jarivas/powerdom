const helper = {
    DEFAULT_SELECTOR: '[linkd]',
    ATTR_VAL: 'val',
    ATTR_REF: 'ref',
    attrSelectors: [],
    proxiedObjectsFn: new Map(),
    valueSetter: function (el, value) {
        switch(el.tagName){
            case "INPUT": 
            case "SELECT": el.value = value
            break
            default: app.PD(el).setContent(value)
        }
    },
    process_ref_helper_prepare: function (strVar) {
        let prop = null,
            parentKey = '',
            v = null

        strVar = strVar.replace('window.', '')

        if (strVar.includes('.')) {
            const arrayVar = strVar.split('.')

            prop = arrayVar[arrayVar.length - 1]
            parentKey = strVar.replace(`.${prop}`, '')
            v = window[arrayVar[0]]

            for (let i = 1; i < arrayVar.length ; ++i)
                v = v[arrayVar[i]]
        } else {
            prop = strVar
            parentKey = 'window'
            parentObj = window
        }

        return [prop, parentKey, v]
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
        const [prop, parentKey, value] = prepared

        helper.process_ref_helper_proxy(prop, parentKey, el)
        helper.valueSetter(el, value)
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
    static parse(element) {
        Template.loadAll(element)
        helper.process(element)
    }

    static loadAll(element) {
        app.selectAll('tpl', element).forEach(tpl => {
            const url = tpl.getAttribute('src')

            app.Importer.importTemplate(url, tpl, true)

            helper.process(tpl)
        });
    }
}

export default Template