const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router/router'); // 导入单独的路由配置

const app = new Koa();

app.use(bodyParser());

// 使用外部定义的路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});