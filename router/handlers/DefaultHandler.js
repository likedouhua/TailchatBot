// handlers/DefaultHandler.js
class DefaultHandler {
  onPostMessage(receivedMsg) {
    console.log('Unrecognized message type:', receivedMsg);
    // 可以执行一些默认处理
  }
  buildSendMessage() {
    this._buildSendMessage(message);
  }

  buildMsgContent() {
    this._buildMsgContent(message);
  }

  _buildSendMessage(message) {
    // 子类实现
  }

  _buildMsgContent(message) {
    // 子类实现
  }
}
module.exports = {
  DefaultHandler
}