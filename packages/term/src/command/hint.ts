/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-20 12:16:30
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 09:22:10
 */

import { ensureInputIsVisible } from 'src/ui/components/input-item';
import { Hint } from '../state/global-info';
import { splitTwoPart } from '../utils/utils';
import { getCommand } from './command-handler';
import { onTab } from './tab';

let hintTimer: any = null;

export function clearHitTimer () {
    clearTimeout(hintTimer);
}

export function onHint (value: string) {
    clearHitTimer();
    hintTimer = setTimeout(() => {
        const list = getHintList(value);
        const [ name ] = splitTwoPart(value, ' ');
        const command = getCommand(name);
        const text = command ? command.help : '';
        // console.log(list);
        Hint.setHint(text, list);
        ensureInputIsVisible();
    }, 500);

}

export function getHintList (value: string): string[] {
    return onTab(value, true);
}