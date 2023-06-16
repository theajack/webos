/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-16 08:21:41
 */

import { createTerm } from 'packages/term';
// import { Application } from 'packages/module/dist/webos-module.esm';
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

// window.app = new Application({
//     // onLoaded?: TModuleLoaded,
//     // iifeNameMap?: Record<string, string>;
//     // mainMap?: Record<string, string>;
//     // onDependenciesParsed?(graph: Record<string, object>): void;
//     // onProgress?: TModuleProgress;
//     // env?: Record<string, any>;
//     // code?: string;
//     // code: 'console.log(111)',
//     onDependenciesParsed (d) {
//         console.log('onDependenciesParsed', d);
//     },
//     onProgress (d) {
//         console.log('onProgress', d);
//     },
//     onLoaded (d) {
//         console.log('onLoaded', d);
//     },
// });