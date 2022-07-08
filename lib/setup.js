const vite = require('./vite.js');

module.exports = async function({viteConfigFile = null} = {}) {
  const viteServer = await vite.start({
    configFile: viteConfigFile
  });

  return viteServer;
}