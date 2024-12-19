const path = require('path');
const logger = require("../../utils/logger")

class BotLogicBase {
    constructor(sPath, tCallBack) {
        this.tCallBack = tCallBack;

        const oConfig = jsonConfig.getConfigSync(path.join(__dirname, sPath, sPath + '.json'));
        if (!oConfig) {
            logger.info('error BotLogic not found:', sPath);
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
        logger.info('BotLogicBase:', message);
        // 子类实现
    }

    _onMessageUpdate(message) {
        // 子类实现
    }
}

module.exports = {
    BotLogicBase,
}