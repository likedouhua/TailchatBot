global.jsonConfig = require('./jsonConfig');

const oServerConfig = jsonConfig.getConfigSync('./server.json');
if (!oServerConfig) {
    console.log('not found ./server.json');
    process.exit(1);
}

const TailchatBot = require('./bot/bot').TailchatBot;
var tTailchatBot = {};
for (const oBotConfig of oServerConfig.botList) {
    const oTailchatBot = new TailchatBot(oServerConfig.url, oBotConfig.appId, oBotConfig.appSecret, oBotConfig.disableMsgpack, oBotConfig.logicList);
    tTailchatBot[oBotConfig.appId] = oTailchatBot;
}

/***********************************************************/
/***********************外部调用监听*************************/
/***********************************************************/
// Windows上用于调试，屏蔽真连接
if (process.platform == 'win32') {
    process.exit(0);
}
const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

app.use(BodyParser());

// 定义一个 POST 路由
router.post('/submit', (ctx) => {
  const { enableGroup, id, message, type } = ctx.request.body;
  if (type === '') {
    analyticsData(enableGroup, id, message);
  }
  ctx.status = 200; // 设置响应状态码
  ctx.body = 'POST request received'; // 设置响应体
});

// 定义动作 A
function jenkinsMessage(enableGroup, id, message) {
  //主动发送个人、或者群组消息
  if (enableGroup) {

  } else {

  }
}

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});