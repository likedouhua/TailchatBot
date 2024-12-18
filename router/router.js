const Router = require('koa-router');
const { jenkinsValidator, redmineValidator } = require('./validators');
const JenkinsHandler = require('./handlers/JenkinsHandler').JenkinsHandler;
const RedmineHandler = require('./handlers/RedmineHandler').RedmineHandler;
const DefaultHandler = require('./handlers/DefaultHandler').DefaultHandler;

class RouterHandler {
  constructor(oServerConfig,tTailchatBot) {
    this.router = new Router();
    this.initRouter(oServerConfig.callback);
    this.handlers = this.initHandlers();
    this.bot = tTailchatBot[oServerConfig.postBotId];
  }

  initRouter(callbackUrl) {
    this.router.post(callbackUrl, this.handlePostRequest.bind(this));
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
      console.log("jenkins");
      return 'jenkins';
    } else if (redmineValidator(receivedMsg)) {
      console.log("redmine");
      return 'redmine';
    } else {
      console.log("default");
      return 'default';
    }
  }

  async sendMessage(message){
    if(message.converseId){
      try {
        await this.bot.sendMessage(message.converseId, message.groupId, message.content,null,null);
    } catch (error) {
        console.error(error);
    }
    }
    console.log(message);
  }
}

module.exports = {
  RouterHandler
}