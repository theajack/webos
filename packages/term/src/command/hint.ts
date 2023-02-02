/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-20 12:16:30
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 09:19:58
 */

import { ensureInputIsVisible } from '../ui/components/input-item';
import { Hint } from '../state/global-info';
import { onTab } from './tab';
import { Term } from '../../../term';

let hintTimer: any = null;

export function clearHitTimer () {
    clearTimeout(hintTimer);
}

export function onHint (value: string, term: Term) {
    clearHitTimer();
    hintTimer = setTimeout(async () => {
        const [ name, subName ] = value.split(' ');
        const command = term.commands.getCommand(name);
        const item = (subName && command) ? command.subCommands[subName] : null;
        if (item && typeof item  === 'object' && value.split(' ').length === 3) {
            const list = item.hintArray || await getHintList(value, term);
            const text = item.help || (command ? command.help : '');
            Hint.setHint(text, list);
        } else {
            const list = await getHintList(value, term);
            const text = command ? command.help : '';
            Hint.setHint(text, list);
        }
        ensureInputIsVisible(term.ui.container);
    }, 500);

}

export async function getHintList (value: string, term: Term): Promise<string[]> {
    return await onTab(value, term, true);
}