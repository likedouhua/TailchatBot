/*
{
  payload: {
    action: 'updated',
    issue: {
      id: 7013,
      subject: '【美术】战斗相关美术需求',
      description: '伤害飘字、buff图标、音效、特效等',
      created_on: '2024-12-16T08:54:43.000Z',
      updated_on: '2024-12-17T12:02:41.000Z',
      closed_on: null,
      root_id: 7013,
      parent_id: null,
      done_ratio: 0,
      start_date: '2024-12-16',
      due_date: null,
      estimated_hours: null,
      is_private: false,
      lock_version: 2,
      //自定义数组，在内容为用户id
      custom_field_values: [Array],
      //项目信息
      project: [Object],
      status: [Object],
      tracker: [Object],
      priority: [Object],
      //创建人
      author: [Object],
      assignee: [Object],
      watchers: []
    },
    journal: {
      id: 47381,
      notes: '',
      created_on: '2024-12-17T12:02:41.000Z',
      private_notes: false,
      author: [Object],
      details: [Array]
    },
    url: 'http://oa.xfgame.com/redmine/issues/7013'
  }
}

author
{
  id:8,
  login:'zhangsan',
  mail:'zhangsan@shengyu.cn',
  firstname:'张三',
  lastname:'zhangsan',
  identity_url:null,
  icon_url:'http******'
}

status
{
  id:10,
  name:'策划验收'
}

*/
const DefaultHandler = require('./DefaultHandler').DefaultHandler

class RedmineHandler extends DefaultHandler {
  constructor() {
    console.log('RedmineHandler constructor');
    super();
  }
  
  onPostMessage(receivedMsg) {
    console.log('Processing Redmine message:', receivedMsg);
    // 实现Redmine消息的处理逻辑
    const messageContent = this.buildMsgContent(receivedMsg);
    const tailmessage = buildSendMessage(messageContent);
    return tailmessage;
  }

  buildSendMessage(messageContent) {
    const tailmessage = {
      //根据项目名转换为群组ID
      converseId: '',
      text: messageContent
    }
    return tailmessage;
  }

  buildMsgContent(redmineData) {
    const subject = redmineData.payload.issue.subject;
    const action = redmineData.payload.action;
    const author = redmineData.payload.journal.author.firstname;
    const state = redmineData.payload.journal.status.name;

    const message_title = "[md] ## 工单推送[/md]";
    const message_subject = "[md] ####" + subject + "[/md]";
    const message_author = "创建者：" + mdFormat_Blod(author);
    const message_state = "状态：" + mdFormat_Blod(state);

    const content = {
      message_title,
      message_subject,
      message_author,
      message_state
    }
    return content;
  }

  mdFormat_Blod(text) {
    return "[md]**" + text + "**[/md]";
  }

  mdFormat_Italic(text) {
    return "[md]*" + text + "*[/md]";
  }
}
module.exports = { RedmineHandler }