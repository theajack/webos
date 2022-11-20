/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 13:15:07
 */

import { Term } from '../../term';
import { Command } from './command-base';

export class PWDCommand extends Command {
    commandName = 'pwd';
    desc = 'show current path';
    get help () {
        return this.commandName;
    }

    async run (args: string[]) {
        this.handleArgs(args);
        return this.success(Term.CurrentPath);
    }
}
