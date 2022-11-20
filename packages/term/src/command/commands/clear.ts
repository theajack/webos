/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 15:04:37
 */

import { HistoryId } from '../../ui/components/history';
import { Command } from './command-base';

export class ClearCommand extends Command {
    commandName = 'clear';
    hint: 'none' = 'none';
    desc = 'Clear console';
    get help (): string {
        return this.commandName;
    }

    async run () {
        const history = document.querySelector(HistoryId);
        if (history) {
            history.innerHTML = '';
            return this.success();
        } else {
            return this.fail('history not found');
        }
    }
}
