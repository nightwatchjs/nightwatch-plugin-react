# nightwatch react plugin
<p>
  <img alt="Nightwatch.js Logo" src=".github/assets/nightwatch-logo.svg" width=200 />
  <img alt="React Logo" src=".github/assets/react-logo.png" width=200 />
</p>

[![version][version-badge]][package]
[![Discord][discord-badge]][discord]
[![MIT License][license-badge]][license]

Official Nightwatch plugin which adds component testing support for React apps. It uses the [Vite](https://vitejs.dev/) dev server under the hood and [vite-plugin-nightwatch](https://github.com/nightwatchjs/vite-plugin-nightwatch). Requires Nightwatch 2.0+

```
npm install @nightwatch/react
```

## Usage:

### Configuration
Update your [Nightwatch configuration](https://nightwatchjs.org/guide/configuration/overview.html) and add the plugin to the list:

```js
module.exports = {
  plugins: ['@nightwatch/react']
  
  // other nightwatch settings...
}
```

### Update your Nightwatch globals file

If you're not already using external globals with Nightwatch, go ahead and create a new file (e.g. `test/globals.js`) and then set the path in your Nightwatch config file:

```js
module.exports = {
  plugins: ['@nightwatch/react'],
  
  globals_path: 'test/globals.js'
  // other nightwatch settings...
}
```

Read more about [external globals](https://nightwatchjs.org/guide/using-nightwatch/external-globals.html) on the Nightwatch docs website.

**`test/globals.js`:**
```js
const {setup} = require('@nightwatch/react');

let viteServer;
module.exports = {
  async before() {
    viteServer = await setup({
      // you can optionally pass an existing vite.config.js file
      // viteConfigFile: '../vite.config.js'
    });
    
    // This will make sure the launch Url is set correctly when mounting the React component
    this.launchUrl = `http://localhost:${viteServer.config.server.port}`;
  },

  async after() {
    await viteServer.close();
  }
}
```

## Already using Vite in your project?

If your project is already based on Vite and you'd like to use the same config file, you can either:
- pass the `viteConfigFile` property to the `setup()` method in the `before()` hook above
- run your Vite dev server separately by doing `npm run dev`

Check the [vite-plugin-nightwatch](https://github.com/nightwatchjs/vite-plugin-nightwatch) project for more configuration options.

## API Commands:
This plugin includes a few Nightwatch commands which can be used while writing React component tests.

### - browser.mountComponent(`componentPath`, `[props]`, `[callback]`):
**Parameters:**
- `componentPath` – location of the component file (`.jsx`) to be mounted
- `props` – properties to be passed to the React component, this will be serialized to JSON; an inline string can be also used
- `callback` – an optional callback function which will be called with the component element

#### Example:
```js
const component = await browser.mountComponent('/src/components/Form.jsx')
```

```js
const component = await browser.mountComponent('/src/components/Form.jsx', {
  prop: 'value'
})
```

A function or a string can be used for passing props that cannot be serialized. If a function is passed, it will be sent as a `toString()` value.
```js
const component = await browser.mountComponent('/src/components/UserInfo.jsx', function () {
  return {
    date: new Date(),
    text: 'I hope you enjoy reading Ulysses!',
    author: {
      name: 'Leopold Bloom',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Poldy.png'
    }
  }
});
```

### - browser.launchComponentRenderer():
This will call `browser.navigateTo('/test_renderer/')` and open the browser. Needs to be used before the `.importScript()` command, if used.

You can also set `launchUrl` as a global at runtime and then the url to be used will be `${browser.globals.launchUrl}/test_renderer`, which makes it possible to set the launch url dynamically.

### - browser.importScript(`scriptPath`, `[options]`, `[callback]`):
**Parameters:**
- `scriptPath` – location of the script file to inject into the page which will render the component; needs to be written in ESM format
- `options` – this can include:
  - `scriptType`: the `type` attribute to be set on the `<script>` tag (default is `module`)
  - `componentType`: should be set to `'react'`
- `callback` – an optional callback function which will be called with the component element

#### Example:
```js
const formComponent = await browser
  .launchComponentRenderer()
  .importScript('/test/lib/scriptToImport.js');
```

Example `scriptToImport.js`:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import Component from '/test/components/Form.jsx'

const element = React.createElement(Component, {});
ReactDOM.render(element, document.getElementById('app'));

// This will be used by Nightwatch to inspect properties of this component
window['@component_element'] = element;
```

## Debugging Component Tests
Debugging component tests in Nightwatch isn't as straightforward as debugging a regular Node.js application or service, since Nightwatch needs to inject the code to render to component into the browser.

However, for when running the tests in Chrome, you can use the DevTools to do debugging directly in the browser. For this purpose, Nightwatch provide 2 CLI flags:
- `--devtools` - when this is on, the Chrome DevTools will open automatically
- `--debug` - this will cause the test execution to pause right after the component is rendered

### Example:
```sh
npx nightwatch test/src/userInfoTest.js --devtools --debug
```

## Run tests:

Tests for this project are written in Nightwatch so you can inspect them as examples, located in the [tests/src] folder.

Run them with::
```sh
npm test 
```


## License
MIT

[build-badge]: https://github.com/nightwatchjs/nightwatch-plugin-react/actions/workflows/node.js.yml/badge.svg?branch=main
[build]: https://github.com/nightwatchjs/nightwatch-plugin-react/actions/workflows/node.js.yml
[version-badge]: https://img.shields.io/npm/v/@nightwatch/react.svg?style=flat-square
[package]: https://www.npmjs.com/package/@nightwatch/react
[license-badge]: https://img.shields.io/npm/l/@nightwatch/react.svg?style=flat-square
[license]: https://github.com/nightwatchjs/nightwatch-plugin-react/blob/main/LICENSE
[discord-badge]: https://img.shields.io/discord/618399631038218240.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square
[discord]: https://discord.gg/SN8Da2X
