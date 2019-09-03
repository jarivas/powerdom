import('/js/config.js').then(config => {
    PD.Config.set(config.default)
    PD.RequestHelper.setConfigUrl()
})