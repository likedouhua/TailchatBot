const Router = require('koa-router');
const { jenkinsValidator, redmineValidator } = require('./validators');
const JenkinsHandler = require('./handlers/JenkinsHandler');
const RedmineHandler = require('./handlers/RedmineHandler');
const DefaultHandler = require('./handlers/DefaultHandler');

class RouterHandler {
  constructor(oServerConfig) {
    this.router = new Router();
    this.handlers = this.initHandlers();
    this.initRouter(oServerConfig.callback);
    this.bot = this.initBot(oServerConfig.postBotId);
  }

  initRouter(callbackUrl) {
    this.router.post(callbackUrl, this.handlePostRequest.bind(this));
    return this.router;
  }

  initBot(postBotId){
    this.bot = global.tTailchatBot?.[postBotId];
  }

  initHandlers() {
    return {
      jenkins: new JenkinsHandler(),
      redmine: new RedmineHandler(),
      default: new DefaultHandler()
    };
  }

  async handlePostRequest(ctx) {
    try {
      const receivedMsg = ctx.request.body;
      await this.processMessage(receivedMsg);
      ctx.status = 200;
      ctx.body = 'POST request received';
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
      console.error('Error processing request:', error);
    }
  }

  async processMessage(receivedMsg) {
    const type = this.validateMessageType(receivedMsg); // 返回 'jenkins'/'redmine'/'default'
    const message = await this.handlers[type].onPostMessage(receivedMsg);
    this.sendMessage(message);
  }


  validateMessageType(receivedMsg) {
    if (jenkinsValidator(receivedMsg)) {
      return 'jenkins';
    } else if (redmineValidator(receivedMsg)) {
      return 'redmine';
    } else {
      return 'default';
    }
  }

  sendMessage(message){
    this.bot.sendMessage(message.converseId, message.groupId, message.content,null,null);
  }
}

module.exports = {
  RouterHandler
}