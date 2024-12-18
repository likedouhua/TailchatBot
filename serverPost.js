const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const RouterHandler = require('./router/router').RouterHandler; // 导入单独的路由配置
const app = new Koa();

const oServerConfig = jsonConfig.getConfigSync('./config/serverBot.json');
if (!oServerConfig) {
    console.log('not found serverBot.json');
    process.exit(1);
}

app.use(bodyParser());

// 使用外部定义的路由
const router = new RouterHandler(oServerConfig);
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});