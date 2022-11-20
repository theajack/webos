/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-14 09:14:11
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-18 23:21:22
 */
import { startTest } from 'easy-test-lib';
import path from './cases/path';

startTest({
    cases: [
        ...path,
    ],

    onTestComplete ({ passed, results, time }) {
        console.log(`%c【TEST ${passed ? 'PASSED' : 'FAILED'}!】[time=${time}]`, `color: ${passed ? 'green' : 'red'}`);

        results.forEach(({ name, index, passed, result, expect }) => {
            const text = `%c【name=${name}】[${index}]${passed ? 'passed' : 'failed'} 
    result:${JSON.stringify(result)} ${!passed ? `
    expect:${JSON.stringify(expect)}` : ''}`;
            console.log(text, `color: ${passed ? 'green' : 'red'}`);
        });

    }
});