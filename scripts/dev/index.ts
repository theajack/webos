/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 16:15:37
 */

import { createTerm } from 'packages/term';
// import '../unit-test/index';

createTerm({
    container: 'body'
}).then(term => {
    (window as any).term = term;
});