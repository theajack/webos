/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 23:15:47
 */

import { createTerm } from 'packages/term';
// import '../unit-test/index';

// createTerm({
//     container: '#app'
// }).then(term => {
//     (window as any).term = term;
// });
// createTerm({
//     container: '#app2'
// }).then(term => {
//     (window as any).term = term;
// });


createTerm({
    container: 'body'
}).then(term => {
    (window as any).term = term;
});