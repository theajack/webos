
/*
 * @Author: tackchen
 * @Date: 2022-09-04 08:04:01
 * @Description: Coding something
 */
declare module 'filer' {
  export const fs: any;
}
declare module 'filer.js' {
  export class Filer {
  }

  export default Filer;
}

interface Window {
    __THIRD__APPS__: {
      [prop: string]: any;
    };
}