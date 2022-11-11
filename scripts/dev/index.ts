/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:37:03
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 10:40:43
 */

import { createTerm } from 'packages/term';

createTerm().then(term => {
    window.term = term;
});