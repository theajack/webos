/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-20 12:16:30
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-13 07:45:41
 */

import { ensureInputIsVisible } from '../ui/components/input-item';
import { Hint } from '../state/global-info';
import { getCommand } from './command-handler';
import { onTab } from './tab';

let hintTimer: any = null;

export function clearHitTimer () {
    clearTimeout(hintTimer);
}

export function onHint (value: string) {
    clearHitTimer();
    hintTimer = setTimeout(async () => {
        const [ name, subName ] = value.split(' ');
        const command = getCommand(name);
        const item = (subName && command) ? command.subCommands[subName] : null;
        if (item && typeof item  === 'object' && value.split(' ').length === 3) {
            const list = item.hintArray || await getHintList(value);
            const text = item.help || (command ? command.help : '');
            Hint.setHint(text, list);
        } else {
            const list = await getHintList(value);
            const text = command ? command.help : '';
            Hint.setHint(text, list);
        }
        ensureInputIsVisible();
    }, 500);

}

export async function getHintList (value: string): Promise<string[]> {
    return await onTab(value, true);
}