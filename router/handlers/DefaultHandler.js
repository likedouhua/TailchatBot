// handlers/DefaultHandler.js
class DefaultHandler {
  constructor(sPath, tCallBack) {
    this.tCallBack = tCallBack;

    console.log("DefaultHandler constructor");
  }
  onPostMessage(receivedMsg) {
    console.log('Unrecognized message type');
    // 可以执行一些默认处理
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