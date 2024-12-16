const BotLogicBase = require('../botLogic').BotLogicBase

class PostResponse extends BotLogicBase {
    constructor(sPath, tCallBack) {
        super(sPath, tCallBack);
        
        console.log('PostResponse init:', this.oConfig);
    }

    _onMessage(message) {
    }

    _onMessageUpdate(message) {
        
    }

}

module.exports = {
    BotLogic : PostResponse,
}