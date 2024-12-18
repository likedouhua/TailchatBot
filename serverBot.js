global.jsonConfig = require('./config/jsonConfig');

const oServerConfig = jsonConfig.getConfigSync('./config/serverBot.json');
if (!oServerConfig) {
    console.log('not found serverBot.json');
    process.exit(1);
}

const TailchatBot = require('./bot/bot').TailchatBot;
var tTailchatBot = {};
for (const oBotConfig of oServerConfig.botList) {
    const oTailchatBot = new TailchatBot(oServerConfig.url, oBotConfig.appId, oBotConfig.appSecret, oBotConfig.disableMsgpack, oBotConfig.logicList);
    tTailchatBot[oBotConfig.appId] = oTailchatBot;
}

module.exports = {
    tTailchatBot
}