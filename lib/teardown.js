module.exports = async function() {
  if (global.viteServer) {
    await global.viteServer.close();
  }
};