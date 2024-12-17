const { spawn } = require('child_process');
const path = require('path');

// 获取每个脚本的完整路径
const serverPostPath = path.resolve(__dirname, 'serverPost.js');
const serverBotPath = path.resolve(__dirname, 'serverBot.js');

// 函数用于监听子进程并输出日志信息
function runScript(scriptPath) {
  const process = spawn('node', [scriptPath], { stdio: 'inherit' });

  process.on('error', (error) => {
    console.error(`Failed to start script: ${scriptPath}\nError: ${error.message}`);
  });

  process.on('close', (code) => {
    console.log(`Script ${scriptPath} exited with code ${code}`);
  });
}

// 运行两个脚本
runScript(serverPostPath);
runScript(serverBotPath);