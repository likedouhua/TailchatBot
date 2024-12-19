const BotLogicBase = require('../botLogic').BotLogicBase

class PersonalAssistantLogic extends BotLogicBase {
    constructor(sPath, tCallBack) {
        super(sPath, tCallBack);
    }

    _onMessage(message) {
        // 屏蔽群消息
        if (!message.groupId) { 
            let sContent = message.content;
            for (const sOrder in this.oConfig.orderMap) {
                let sMark = this.oConfig.symbol + sOrder;
                if (sContent.includes(sMark)) {
                    let sFunc = this.oConfig.orderMap[sOrder];
                    this[sFunc](message, sContent.replace(sMark, '').trim());
                }
            }
        }
    }

    _onMessageUpdate(message) {
        
    }

    getID(message) {
        /*
        用户通过私聊机器人来获取自己的聊天面板ID
        便于外部设置 jenkins推送 和 工单推送
        */
       this.tCallBack.sendMessage(message.converseId, null, message.author);
    }

    relogin(message) {
        this.tCallBack.relogin(() => {
            this.tCallBack.sendMessage(message.converseId, null, this.oConfig.reply.reloginSuccess);
        });
    }

    registerJenkins(message, sContent) {
        const sParts = sContent.split('=');
        const sName = sParts.pop();
        if (!sName) {
            return;
        }
        const sPath = './config/registerJenkins.json'
        const oJSON = jsonConfig.getConfigSync(sPath) ?? [];
        oJSON.push({
            "name" : sName,
            "converseId" : message.converseId
        })
        jsonConfig.saveConfigSync(sPath, oJSON);
        this.tCallBack.sendMessage(message.converseId, null, this.oConfig.reply.registerJenkinsSuccess);
    }
}

module.exports = {
    BotLogic : PersonalAssistantLogic,
}