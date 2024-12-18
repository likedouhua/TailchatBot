// handlers/DefaultHandler.js
const sPath = './config/registerJenkins.json'

class DefaultHandler {
  constructor(sPath, tCallBack) {
    this.tCallBack = tCallBack;
  }

  onPostMessage(receivedMsg) {
    const oJSON = jsonConfig.getConfigSync(sPath) ?? [];
    const realId = oJSON.find(item => item.name == receivedMsg.converseId);
    const converseId = realId ? realId.converseId : null;
    return this._onPostMessage(receivedMsg,converseId);
  }

  buildSendMessage(message) {
    this._buildSendMessage(message);
  }

  buildMsgContent(message) {
    this._buildMsgContent(message);
  }

  _onPostMessage(message) {
    // 子类实现
  }

  _buildSendMessage(message) {
    // 子类实现
  }

  _buildMsgContent(message) {
    // 子类实现
  }
  
  mdFormat_Blod(text) {
    return "[md]**" + text + "**[/md]";
  }

  mdFormat_Italic(text) {
    return "[md]*" + text + "*[/md]";
  }
}
module.exports = {
  DefaultHandler
}