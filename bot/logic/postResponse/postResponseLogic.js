const BotLogicBase = require('../botLogic').BotLogicBase

class PostResponse extends BotLogicBase {
    constructor(sPath, tCallBack) {
        super(sPath, tCallBack);
        
        console.log('PostResponse init:', this.oConfig);
    }

    _onMessage(receivedMsg) {

    }

    _onMessageUpdate(message) {
        
    }

    onPostMessage(receivedMsg){
        if (receivedMsg.type) {
            let sFunc = receivedMsg.type;
            this[sFunc](receivedMsg);
        }
    }

    jenkins(receivedMsg){
       this.tCallBack.sendMessage(receivedMsg.converseId, null, receivedMsg.text);
    }

    redmine(){

    }
}

module.exports = {
    BotLogic : PostResponse,
}