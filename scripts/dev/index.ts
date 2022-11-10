/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-09 23:13:51
 */

import { createTerm } from 'packages/term/src/term';

createTerm().then(term => {
    window.term = term;
});