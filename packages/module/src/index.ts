
/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-13 08:41:54
 * @Description: Coding something
 */
export { babel } from './babel-file';
import { Application } from './application';

new Application({
    code: `
  import {div} from 'alins';
  import * as Loadsh from 'loadsh';
  console.log(div);
  div('1111').mount(document.body);
  export default {div, Loadsh};
  `,
    onloaded: (entry) => {
        console.log(entry);
        (window as any).entry = entry;
    },
    umdNameMap: {
        'alins': 'Alins'
    }
});

// export function safeLeftMove (value: number, n: number) {
//     const max = 1 << (32 - n);
//     if (value < max)
//         return value << n;
//     return (value & (max - 1)) << n;
// }
// const N_31_1 = 2 ** 31 - 1;
// function completeCode (value: number) {
//     if (value > 0) return value.toString(2);
//     return '1' + ((-value ^ N_31_1) + 1).toString(2);
// }

// (window as any).safeLeftMove = safeLeftMove;
// (window as any).completeCode = completeCode;