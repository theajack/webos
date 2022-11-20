/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 11:18:35
 */

// import { div } from 'alins';
import { catFile } from './cat';
import { Command } from './command-base';

export class RmCommand extends Command {
    commandName = 'rm';
    desc = 'Remove file or directory';

    async run (args: string[]) {
        this.handleArgs(args);

        const target = catFile(args);

        if (!target) return this.fail('Target is not exist');

        await target.remove();

        return this.success(`Removed ${target.path.path}!`);
    }
}
