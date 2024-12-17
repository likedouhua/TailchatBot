// handlers/DefaultHandler.js
class DefaultHandler {
    onPostMessage(receivedMsg) {
      console.log('Unrecognized message type:', receivedMsg);
      // 可以执行一些默认处理
    }
  }
  module.exports = DefaultHandler;