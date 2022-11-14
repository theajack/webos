/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 19:41:02
 */

import { HistoryId } from 'src/ui/components/history';
import { Command } from './command-base';

export class ClearCommand extends Command {
    commandName = 'clear';

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
