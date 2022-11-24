/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:04:32
 */

import { Term } from '../../term';
import { Command } from './command-base';

export class PWDCommand extends Command {
    commandName = 'pwd';
    desc = 'show current path';
    get help () {
        return this.commandName;
    }

    async main () {
        return this.success(Term.CurrentPath);
    }
}
