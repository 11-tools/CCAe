const {ipcMain} = require('electron')

module.exports = (browsers, sharedObject) => {
    const {deficiency} = browsers
    ipcMain.on('init-deficiency', () => {
        const i18n = new(require('../i18n'))(sharedObject.preferences.main.lang)
        let config = {
            i18n: i18n.asObject().Deficiency
        }
        sendEvent('init', config)
    })

    let sendEvent = (event, ...params) => {
        const win = deficiency.getWindow()
        if (win) {

        switch(event) {
            case 'langChanged':
                const i18n = new(require('../i18n'))(sharedObject.preferences.main.lang)
                win.webContents.send(event, i18n.asObject().Deficiency)
                break
            default:
                win.webContents.send(event, ...params)
            }
        }
    }

    return {
        sendEvent: sendEvent,
    }
}