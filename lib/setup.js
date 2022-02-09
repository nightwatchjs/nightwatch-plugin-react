const path = require('path');
const vite = require('./vite.js');

module.exports = async function({viteConfigFile = null} = {}) {
  const viteServer = await vite.start({
    configFile: path.join(__dirname, '../vite.config.js')
  });

  return viteServer;
}