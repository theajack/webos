/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 19:55:51
 */

import { div } from 'alins';
import { Term } from '../../term';
import { Command } from './command-base';

export class MkdirCommand extends Command {
    commandName = 'mkdir';
    desc = 'Create a directory';
    get help () {
        return this.commandName + ' <dirname>';
    }

    async run (args: string[]) {
        this.handleArgs(args);

        const name = args[0];

        if (!name) {
            return this.fail('mkdir: Dir name is empty');
        }

        try {
            if (await Term.CurrentDir.createChildByPath(name, true)) {
                return this.success(div('success'));
            }
            return this.fail('mkdir failed: Target Path is exist:' + name);
        } catch (e) {
            console.error(e);
            return this.fail('mkdir failed: ' + name);
        }
    }
}
