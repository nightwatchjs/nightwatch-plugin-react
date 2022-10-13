const path = require('path');

const vite_dev_server = {
  port: 5174
};
try {
  const nightwatch_config = require(path.resolve('./nightwatch.conf.js'));
  Object.assign(vite_dev_server, nightwatch_config.vite_dev_server || {});
} catch (err) {}

const vite = require('./vite.js');

module.exports = async function({viteConfigFile = null} = {}) {
  const viteServer = await vite.start({
    configFile: viteConfigFile,
    port: vite_dev_server.port
  });

  global.viteServer = viteServer;

  return viteServer;
}