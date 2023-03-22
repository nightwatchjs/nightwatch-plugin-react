import { NightwatchBrowser, Element } from 'nightwatch';

declare module 'nightwatch' {
  interface NightwatchBrowser {
    importScript(scriptPath: string, options: { scriptType: string; componentTyp: string }, callback: () => void): this;
    mountReactComponent(componentPath: string, props?: string | (() => void), callback?: () => void): Element;
    mountComponent(componentPath: string, props?: string | (() => void), callback?: () => void): Element;
    launchComponentRenderer(): this;
  }
}
