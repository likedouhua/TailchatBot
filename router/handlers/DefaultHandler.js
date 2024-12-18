// handlers/DefaultHandler.js
class DefaultHandler {
  constructor(){
    console.log("DefaultHandler constructor");
  }
  onPostMessage(receivedMsg) {
    console.log('Unrecognized message type:', receivedMsg);
    // 可以执行一些默认处理
    this._onPostMessage(message);
  
  }
  buildSendMessage() {
    this._buildSendMessage(message);
  }

  buildMsgContent() {
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