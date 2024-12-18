const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const RouterHandler = require('./router/router').RouterHandler; // 导入单独的路由配置
const app = new Koa();
const path = require('path');

console.log(path.join(path.resolve(), 'config', 'jsonConfig'));
global.jsonConfig = require(path.join(path.resolve(), 'config', 'jsonConfig'));
global.jsonData = require(path.join(path.resolve(), 'data', 'jsonData'));

const TailchatBot = require('./bot/bot').TailchatBot;
var tTailchatBot = {};
const oServerConfig = jsonConfig.getConfigSync('./config/serverBot.json');

if (oServerConfig) {
    for (const oBotConfig of oServerConfig.botList) {
        const oTailchatBot = new TailchatBot(oServerConfig.url, oBotConfig.appId, oBotConfig.appSecret, oBotConfig.disableMsgpack, oBotConfig.logicList);
        tTailchatBot[oBotConfig.appId] = oTailchatBot;
    }
}
else {
    console.log('not found ./config/serverBot.json');
}

if (!oServerConfig) {
    console.log('not found serverBot.json');
    process.exit(1);
}

app.use(bodyParser());

// 使用外部定义的路由
const router = new RouterHandler(oServerConfig,tTailchatBot);

app.use(router.router.routes());
app.use(router.router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
