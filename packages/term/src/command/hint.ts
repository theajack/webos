/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-20 12:16:30
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 15:53:04
 */

import { Hint } from '../state/global-info';
import { splitTwoPart } from '../utils/utils';
import { getCommand } from './command-handler';
import { onTab } from './tab';

let hintTimer: any = null;

export function onHint (value: string) {
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => {
        const list = getHintList(value);
        const [ name ] = splitTwoPart(value, ' ');
        const command = getCommand(name);
        const text = command ? command.help : '';
        Hint.setHint(text, list);
    }, 800);

}

export function getHintList (value: string): string[] {
    return onTab(value, true);
}