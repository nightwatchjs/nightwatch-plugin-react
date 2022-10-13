const fs = require('fs');
const path = require('path');

const setup = require('../lib/setup.js');

let viteServer;
const projectConfigFile = path.join(process.cwd(), 'vite.config.js');
const viteConfigFile = path.join(__dirname, '../vite.config.js');

const hasProjectConfigFile = () => {
  try {
    return fs.statSync(projectConfigFile).isFile();
  } catch (err) {
    return false;
  }
}

module.exports = {
  async before(settings) {
    viteServer = await setup({
      viteConfigFile: hasProjectConfigFile() ? projectConfigFile : viteConfigFile
    });

    // This will make sure the launch Url is set correctly when mounting the React component
    const vite_port = viteServer.config.server.port;
    settings.vite_port = vite_port;
    this.launchUrl = this.baseUrl = `http://localhost:${vite_port}`;
  },

  async after() {
    if (viteServer) {
      await viteServer.close();
    }
  }
}