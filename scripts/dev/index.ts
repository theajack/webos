/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-01 22:10:56
 */

import { createTerm } from 'packages/term';
// import '../unit-test/index';

createTerm({
    container: '#app'
}).then(term => {
    (window as any).term = term;
});