const path = require('path');
class BotLogicBase {
    constructor(sPath, tCallBack) {
        this.tCallBack = tCallBack;

        const oConfig = jsonConfig.getConfigSync(path.join(__dirname, sPath, sPath + '.json'));
        if (!oConfig) {
            console.log('error BotLogic not found:', sPath);
        }
        this.oConfig = oConfig;
    }

    onMessage(message) {
        this._onMessage(message);
    }

    onMessageUpdate(message) {
        this._onMessageUpdate(message);
    }

    _onMessage(message) {
        console.log('BotLogicBase:', message);
        // 子类实现
    }

    _onMessageUpdate(message) {
        // 子类实现
    }
}

module.exports = {
    BotLogicBase,
}