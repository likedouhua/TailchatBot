/*jenkins消息格式
//不需要群组发送
{
    "type":"",
    "text":"",
    "converseId":""
}
 */
const DefaultHandler = require('./DefaultHandler').DefaultHandler

class JenkinsHandler extends DefaultHandler {
  constructor(sPath, tCallBack) {
    super(sPath, tCallBack);
    console.log('JenkinsHandler constructor');
  }
  
  // 处理消息
  _onPostMessage(receivedMsg) {
    console.log('Processing Jenkins message:', receivedMsg);
    const messageContent = this._buildMsgContent(receivedMsg);
    const message = this._buildSendMessage(receivedMsg,messageContent);
    return message;
  }

  _buildSendMessage(receivedMsg,messageContent) {
    const tailmessage = {
      type: receivedMsg.type,
      //根据项目名转换为群组ID
      converseId: receivedMsg.converseId,
      text: messageContent
    }
    return tailmessage;
  }

  _buildMsgContent(jenkinsData) {
    const message_title = "[md] ## Jenkins推送[/md]";
    const message_content = jenkinsData.text.split('\n');

    const content = {
      message_title,
      message_content
    }
    return content;
  }

}



module.exports = {JenkinsHandler}