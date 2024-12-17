class JenkinsHandler {
    onPostMessage(receivedMsg) {
      console.log('Processing Jenkins message:', receivedMsg);
      // 实现Jenkins消息的处理逻辑
    }
  }
  
  module.exports = JenkinsHandler;