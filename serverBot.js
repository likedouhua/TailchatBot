const path = require('path');
global.jsonConfig = require(path.join(path.resolve(), 'config', 'jsonConfig'));
global.jsonData = require(path.join(path.resolve(), 'data', 'jsonData'));

const TailchatBot = require('./bot/bot').TailchatBot;
var tTailchatBot = {};
for (const oBotConfig of oServerConfig.botList) {
    const oTailchatBot = new TailchatBot(oServerConfig.url, oBotConfig.appId, oBotConfig.appSecret, oBotConfig.disableMsgpack, oBotConfig.logicList);
    tTailchatBot[oBotConfig.appId] = oTailchatBot;
}

module.exports = {
    tTailchatBot
}
