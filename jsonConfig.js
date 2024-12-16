
function getConfigSync(sPath) {
   try {
      const fs = require('fs');
      // 在使用require 加载一个文件后，它被缓存了。因此，再次使用require 加载该文件将加载缓存的版本。在服务器环境中，该文件将在下次服务器重启时再次加载。
      // 这里使用读文件，使得可以运行时刷新配置
      const sData = fs.readFileSync(sPath, 'utf8');
      var oConfig = JSON.parse(sData);
      return oConfig;
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   getConfigSync,
}