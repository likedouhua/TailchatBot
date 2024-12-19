const tailchatSDK = require('tailchat-client-sdk');
const TailchatWsClient = tailchatSDK.TailchatWsClient;
const path = require('path');
const logger = require('../utils/logger');

class TailchatBot {
    constructor(url, appId, appSecret, disableMsgpack = false, lLogicName = []) {
        if (!url || !appId || !appSecret) {
            logger.info('require env: url, appId, appSecret');
            process.exit(1);
        }
        this.url = url;
        this.appId = appId;
        this.appSecret = appSecret;
        this.disableMsgpack = disableMsgpack;
        this.login();

        this.lBotLogic = []
        for (const sLogicName of lLogicName) {
            try {
                let sPath = path.join(__dirname, 'logic', sLogicName, sLogicName + 'Logic');
                logger.info(sPath);
                const BotLogic = require(sPath).BotLogic;
                if (BotLogic) {
                    const oLogic = new BotLogic(sLogicName, {
                        sendMessage: (converseId, groupId = null, content, plain = null, meta = null) => {
                            this.sendMessage(converseId, groupId, content, plain, meta);
                        },
                        relogin : () => {
                            this.relogin();
                        }
                    });
                    this.lBotLogic.push(oLogic);
                }
            } catch (error) {
                logger.info(error);
            }
            
        }
    }

    login(oCallBack) {
        if (this.client) {
            logger.info('login():Already login in');
            return;
        }
        // Windows上用于调试，屏蔽真连接
        if (process.platform != 'win32') {
            const client = new TailchatWsClient(this.url, this.appId, this.appSecret, this.disableMsgpack);
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
                logger.info('Login Success! appId:', this.appId);
                self.bConnect = true;

                client.onMessage((message) => {
                    self.onMessage(message);
                });

                client.onMessageUpdate((message) => {
                    self.onMessageUpdate(message);
                });

                if (oCallBack) {
                    oCallBack();
                }
            })
            this.client = client;
        }
    }

    relogin(oCallBack) {
        // 重登
        if (!this.client || !this.bConnect) {
            logger.info('login():Not login in yet');
            return;
        }
        this.client.disconnect();
        delete this.client;
        this.login(oCallBack);
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
        logger.info('sendMessage:', converseId, groupId, content, this.client && this.bConnect);
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