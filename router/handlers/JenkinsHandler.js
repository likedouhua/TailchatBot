/*jenkins消息格式
//不需要群组发送
{
    "type":"",
    "text":"",
    "converseId":""
}
 */
class JenkinsHandler extends DefaultHandler {
  constructor() {
    console.log('JenkinsHandler constructor');
    super();
  }
  
  // 处理消息
  onPostMessage(receivedMsg) {
    console.log('Processing Jenkins message:', receivedMsg);
    const messageContent = buildMsgContent(receivedMsg);
    const message = buildSendMessage(messageContent, receivedMsg);
    // 实现Jenkins消息的处理逻辑
    return message;
  }

  buildSendMessage(message, receivedMsg) {
    const message = {
      type: receivedMsg.type,
      //根据项目名转换为群组ID
      converseId: receivedMsg.converseId,
      text: messageContent
    }
    return message;
  }

  buildMsgContent(jenkinsData) {
    const message_title = "[md] ## Jenkins推送[/md]";
    const message_content = jenkinsData.text.split('\n');

    const content = {
      message_title,
      message_content
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



module.exports = {JenkinsHandler}