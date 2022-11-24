/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:21:35
 */

// import { div } from 'alins';
import { div, text } from 'alins';
import { Term } from '../../term';
import { Command } from './command-base';


export class FindCommand extends Command {
    commandName = 'find';
    desc = 'Filter file or directory with name';
    get help (): string {
        return this.commandName + ' <querystring>';
    }

    async main (args: string[]) {
        const result = Term.CurrentDir.filerChild(args[0]);
        if (result.length === 0) return this.fail('No file or directory found');

        return this.success(
            result.map(item => div(text(`${item.path.path}${item.isDir ? '/' : ''}`)))
        );
    }
}
