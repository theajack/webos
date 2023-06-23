/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-23 11:27:24
 */

import { createTerm } from 'packages/term';
// import { Application } from 'packages/module';
import { Application } from 'packages/module';
// import '../unit-test/index';
import { Path, File, Dir, Disk } from 'packages/term';

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
// console.log(Application);

window.app = new Application({
    // onLoaded?: TModuleLoaded,
    // iifeNameMap?: Record<string, string>;
    // mainMap?: Record<string, string>;
    // onDependenciesParsed?(graph: Record<string, object>): void;
    // onProgress?: TModuleProgress;
    // env?: Record<string, any>;
    // code?: string;
    // code: 'console.log(111)',
    onStart (d) {
        console.warn('onStart', d);
    },
    onDependenciesParsed (d) {
        console.log('onDependenciesParsed', d);
    },
    onProgress (d) {
        console.log('onProgress', d);
    },
    onLoaded (d) {
        console.log('onLoaded', d);
    },
    onError (d) {
        console.warn('onError', d);
    },
    onModuleExecuted (d) {
        console.warn('onModuleExecuted', d);
    },
    onExecuted () {
        console.warn('onExecuted');
    },
});
/*
app.exec(`console.log(<div></div>)`)
app.exec(`return import 1`)
app.exec(`
import eveit from "eveit";
eveit.on('aa', (a)=>{console.log(a)})
eveit.emit('aa', 'sasas')
`)
app.exec('a.a.a=1')
*/