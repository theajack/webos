/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 20:43:36
 */

import { currentPath } from 'src/state/global-info';
import { Command } from './command-base';

export class PWDCommand extends Command {
    name = 'pwd';

    async run (args: string[]) {
        this.args = args;
        return this.success('|' + currentPath.value);
    }
}
