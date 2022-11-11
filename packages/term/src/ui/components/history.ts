/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:23:31
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 20:55:34
 */

import { click, comp, div } from 'alins';
import { style } from 'alins-style';
import { LastLogin } from './last-login';

export const HistoryId = '#TermHistory';

export function History () {
    return div(HistoryId,
        click(() => {}, 'stop'),
        style.color('#bbb').marginBottom(10).borderBottom('1px solid #333').lineHeight(20),
        comp(LastLogin)
    );
}