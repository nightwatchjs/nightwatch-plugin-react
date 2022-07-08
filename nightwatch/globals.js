const path = require('path');
const fs = require('fs');
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
  async before() {
    viteServer = await setup({
      // TODO: make vite config file an option to nightwatch plugin
      // viteConfigFile: hasProjectConfigFile() ? projectConfigFile : viteConfigFile
      viteConfigFile
    });

    // This will make sure the launch Url is set correctly when mounting the React component
    this.launchUrl = this.baseUrl = `http://localhost:${viteServer.config.server.port}`;
  },

  async after() {
    await viteServer.close();
  }
}