/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-14 09:14:11
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-14 09:26:07
 */
import { startTest } from 'easy-test-lib';
import path from './cases/path';


startTest({
    cases: [
        ...path,
    ],
    // args?: any;
    // plugin?: ITestPlugin;
    onTestSingle ({ passed, name, index, result, expect }) {
        console.log(`【】`);
    },
    onTestComplete ({ passed, results, time }) {

    }
});