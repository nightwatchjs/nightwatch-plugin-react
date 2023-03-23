import { NightwatchAPI, Element } from 'nightwatch';

declare module 'nightwatch' {
  interface NightwatchAPI {
    importScript(
      scriptPath: string,
      options: { scriptType: string; componentType: string },
      callback?: () => void
    ): this;
    mountComponent<TProps extends Record<string, any>>(
      componentPath: string,
      props?: TProps,
      callback?: (this: NightwatchAPI, result: Element) => void
    ): Awaitable<this, Element>;
    launchComponentRenderer(): this;
  }
}
