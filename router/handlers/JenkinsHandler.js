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
    // logger.info('JenkinsHandler constructor');
  }
  
  // 处理消息
  _onPostMessage(receivedMsg,converseId) {
    return this._buildSendMessage(receivedMsg,converseId);
  }

  _buildSendMessage(receivedMsg,converseId) {
    const messageContent = this._buildMsgContent(receivedMsg)
    const tailmessage = {
      type: receivedMsg.type,
      //根据项目名转换为群组ID
      converseId: converseId,
      text: messageContent
    }
    return tailmessage;
  }

  _buildMsgContent(jenkinsData) {
    const message_title = "[md] ## Jenkins推送[/md]";
    const message_content = jenkinsData.text;

    const content = message_title+message_content;
    return content;
  }

}



module.exports = {JenkinsHandler}