import { NightwatchAPI, Element } from 'nightwatch';

declare module 'nightwatch' {
  interface NightwatchAPI {
    importScript(
      scriptPath: string,
      options: { scriptType: string; componentType: string },
      callback?: () => void
    ): this;
    mountReactComponent<TProps extends Record<string, any>>(
      componentPath: string,
      props?: TProps,
      callback?: () => void
    ): Element;
    mountComponent<TProps extends Record<string, any>>(
      componentPath: string,
      props?: TProps,
      callback?: () => void
    ): Element;
    launchComponentRenderer(): this;
  }
}
