const tailchatSDK = require('tailchat-client-sdk');
const TailchatWsClient = tailchatSDK.TailchatWsClient;
const path = require('path');

class TailchatBot {
    constructor(url, appId, appSecret, disableMsgpack = false, lLogicName = []) {
        if (!url || !appId || !appSecret) {
            console.log('require env: url, appId, appSecret');
            process.exit(1);
        }

        // Windows上用于调试，屏蔽真连接
        if (process.platform != 'win32') {
            const client = new TailchatWsClient(url, appId, appSecret, disableMsgpack);
            const self = this;
            client.connect().then(async () => {
                /* 返回的消息格式
                {
                _id: '675ac8e93efc03d45489a1f4',
                content: '1',
                author: '675159f35cb2f3c30b6ac067',
                groupId: '67515a155cb2f3c30b6ac07d',
                converseId: '675aae863efc03d454898c9f',
                hasRecall: false,
                meta: { mentions: [] },
                reactions: [],
                createdAt: 2024-12-12T11:28:41.130Z,
                updatedAt: 2024-12-12T11:28:41.130Z,
                __v: 0
                }
                */
                console.log('Login Success! appId:', appId);
                self.bConnect = true;
    
                client.onMessage((message) => {
                    self.onMessage(message);
                });
    
                client.onMessageUpdate((message) => {
                    self.onMessageUpdate(message);
                });
            })
            this.client = client;
        }

        this.lBotLogic = []
        for (const sLogicName of lLogicName) {
            try {
                let sPath = path.join(__dirname, 'logic', sLogicName, sLogicName + 'Logic');
                console.log(sPath);
                const BotLogic = require(sPath).BotLogic;
                if (BotLogic) {
                    const oLogic = new BotLogic(sLogicName, {
                        sendMessage: (converseId, groupId = null, content, plain = null, meta = null) => {
                            this.sendMessage(converseId, groupId, content, plain, meta);
                        },
                    });
                    this.lBotLogic.push(oLogic);
                }
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    onMessage(message) {
        // message = {
        //     _id: '675d539044f5cc4d1d3f0166',
        //     content: '6',
        //     author: '6756aaa3f693751ba00bf22f',
        //     converseId: '675960b3370ab92608ce4646',
        //     hasRecall: false,
        //     meta: { mentions: [] },
        //     reactions: [],
        //     createdAt: 2024-12-14T09:44:48.036Z,
        //     updatedAt: 2024-12-14T09:44:48.036Z,
        //     __v: 0
        //   }
        if (message.author != this.client.userId) {
            for (const oBotLogic of this.lBotLogic) { 
                oBotLogic.onMessage(message);
            }
        }
    }

    onMessageUpdate(message) {
        if (message.author != this.client.userId) {
            for (const oBotLogic of this.lBotLogic) {
                oBotLogic.onMessageUpdate(message);
            }
        }
    }

    sendMessage(converseId, groupId = null, content, plain = null, meta = null) {
        console.log(converseId, groupId = null, content, this.client && this.bConnect);
        if (this.client && this.bConnect) {
            this.client.sendMessage({
                groupId: groupId,
                converseId: converseId,
                content: content,
                plain: plain,
                meta: meta,
            })
        }
    }
}

module.exports = {
    TailchatBot
}