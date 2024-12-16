//import { TailchatWsClient } from 'tailchat-client-sdk';
const TailchatSDK = require('tailchat-client-sdk');
const bodyParser = require('koa-bodyparser');

const TailchatWsClient = TailchatSDK.TailchatWsClient;
const stripMentionTag = TailchatSDK.stripMentionTag;

const HOST = 'http://192.168.2.114:11000/';
const APPID = 'tc_675a8ac7fb4663c26ef82a26';
const APPSECRET = '1M0zV3V5NDceCFjmMf2V5xHORbwqKUWu';

if (!HOST || !APPID || !APPSECRET) {
  console.log('require env: HOST, APPID, APPSECRET');
  process.exit(1);
}

const client = new TailchatWsClient(HOST, APPID, APPSECRET);
/* 返回的消息格式
{
  _id: '675ac8e93efc03d45489a1f4',
  content: '1',
  author: '675159f35cb2f3c30b6ac067',
  groupId: '67515a155cb2f3c30b6ac07d',
  converseId: '675aae863efc03d454898c9f',
  hasRecall: false,
  meta: { mentions: [] },
  reactions: [],
  createdAt: 2024-12-12T11:28:41.130Z,
  updatedAt: 2024-12-12T11:28:41.130Z,
  __v: 0
}
 */
client.connect().then(async () => {
  console.log('Login Success!');

  client.onMessage((message) => {
    if (message.author != client.userId) {
      messageCenter(message)
    }
  });
});

function messageCenter(message) {
  msgData = initMsgData(message);
  sendMessage(msgData);
}

/*调用格式
sendMessage(payload: {
  converseId: string;
  groupId?: string;
  content: string;
  plain?: string;
  meta?: object;
}): Promise<any>;
*/
function initMsgData(payload) {
  curmsg = '';
  if ('groupId' in payload) {
    //群组消息
    if (payload.content[0] == '#') {
      //命令行
      curmsg = botOrder(payload);
    }else{
      //非命令行其他玩法
    }

    Data = {
      converseId: payload.converseId,
      groupId: payload.groupId,
      content: curmsg
    };
  } else {
    //私人消息
    if (payload.content[0] == '#') {
      //命令行
      curmsg = botOrder(payload);
    } else {
      //非命令行其他玩法（被骚扰）
      curmsg = "何意啊？我们很熟嘛？别来沾边";
    }
    Data = {
      converseId: payload.converseId,
      content: curmsg
    }
  }
  return Data;
}

function sendMessage(data) {
  try {
    const sendmessage = client.sendMessage({ data })
    console.log('send message success:', sendmessage)
  } catch (err) {
    console.log('send message failed:', err)
  }
}

/* 命令行指令返回值 */
function botOrder(payload) {
  order = payload.content.slice(1)
  msg = '';
  switch (order) {
    case '创建任务': {
      break;
    }
    case '获取ID':{
      /*
      用户通过私聊机器人来获取自己的聊天面板ID
      便于外部设置 jenkins推送 和 工单推送
      */
      msg = payload.converseId;
      break;
    }
  }
  return msg;
}




/***********************************************************/
/***********************外部调用监听*************************/
/***********************************************************/
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

app.use(bodyParser());

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