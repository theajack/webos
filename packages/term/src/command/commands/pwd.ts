/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-13 19:52:51
 */

import { Term } from 'src/term';
import { Command } from './command-base';

export class PWDCommand extends Command {
    commandName = 'pwd';

    async run (args: string[]) {
        this.handleArgs(args);
        return this.success(Term.CurrentPath);
    }
}
