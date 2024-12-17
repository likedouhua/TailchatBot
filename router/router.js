const Router = require('koa-router');
const { jenkinsValidator, redmineValidator } = require('./validators');
const JenkinsHandler = require('./handlers/JenkinsHandler');
const RedmineHandler = require('./handlers/RedmineHandler');
const DefaultHandler = require('./handlers/DefaultHandler');

// 定义路由
const router = new Router();

// 创建处理程序实例
const handlers = {
  jenkins: new JenkinsHandler(),
  redmine: new RedmineHandler(),
  default: new DefaultHandler()
};

// 定义 POST 路由
router.post('/submit', async (ctx) => {
  const receivedMsg = ctx.request.body;
  let validated = false;

  if (jenkinsValidator(receivedMsg)) {
    handlers.jenkins.onPostMessage(receivedMsg);
    validated = true;
  } else if (redmineValidator(receivedMsg)) {
    handlers.redmine.onPostMessage(receivedMsg);
    validated = true;
  }

  if (!validated) {
    handlers.default.onPostMessage(receivedMsg);
  }

  ctx.status = 200;
  ctx.body = 'POST request received';
});

module.exports = router;