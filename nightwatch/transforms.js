const jsdom = require('jsdom');
const {run} = require('@nightwatch/esbuild-utils');

const jsdomObject = new jsdom.JSDOM('');

module.exports = [{
  name(exportName) {
    return `<${exportName}> component`;
  },

  showBrowserConsole: true,
  filter: /\.[jt]sx$/,

  data(exportName) {
    return {};
  },

  createTest: async function({publicUrl, exportName}) {
    return async function (browser) {
      const {result, element, afterMountError, beforeMountError} = await browser.mountComponent({path: publicUrl, exportName});

      if (element) {
        element.toString = function() {
          return exportName;
        };

        await browser.expect.element(element).to.be.visible;

        return {result, component: element, afterMountError, beforeMountError};
      }

      throw new Error('An error occurred while rendering the component ' + ' <' + (exportName || '')+ '> from ' + publicUrl);
    };
  },

  onlyConditionFn({exportName}, argv = {}) {
    if (!argv.story) {
      return false;
    }

    return exportName.toLowerCase() === argv.story.toLowerCase();
  },

  requireTest(modulePath, options, {argv, nightwatch_settings}) {
    global.window = jsdomObject.window;
    global.document = jsdomObject.window.document;
    global.navigator = jsdomObject.window.navigator;
    global.HTMLElement = jsdomObject.window.HTMLElement;

    return run(modulePath, options, {argv, nightwatch_settings});
  }
}
];