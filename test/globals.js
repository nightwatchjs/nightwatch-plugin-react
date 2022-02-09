const path = require('path');
const vite = require('../lib/vite.js');

let viteServer;
module.exports = {
  async before() {
    viteServer = await vite.start({
      configFile: path.join(__dirname, '../vite.config.js')
    });

    const port = viteServer.config.server.port;

    this.launchUrl = `http://localhost:${port}`;
  },

  async after() {
    await viteServer.close();
  }
}