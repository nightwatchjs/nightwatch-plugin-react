const vite = require('vite');
const getPort = require('get-port');

module.exports.start = async (opts = {}) => {
  const {createServer} = vite;

  const options = Object.assign({
    root: './',
    base: '/',
    mode: 'development',
    configFile: '',
    logLevel: 'info',
    clearScreen: false
  }, opts);

  options.server = {
    host: '0.0.0.0',
    port: null
  };

  if (opts.server) {
    options.server = Object.assign(options.server, opts.server);
  }

  try {
    //options.server.port = opts.port || await getPort();
    if (opts.port) {
      options.server.port = opts.port;
    }
    const server = await createServer(options);

    if (!server.httpServer) {
      throw new Error('HTTP server not available');
    }

    await server.listen();
    const info = server.config.logger.info;

    //info(`\n  vite v${require('vite/package.json').version} dev server running at:\n`);
    //server.printUrls();

    return server;
  } catch (e) {
    console.error(`error when starting dev server:\n${e.stack}`);

    return e;
  }
};

