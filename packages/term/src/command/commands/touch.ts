/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 13:35:11
 */

import { div, text } from 'alins';
import { Term } from '../../term';
import { Command } from './command-base';

export async function touchFile (name: string) {
    try {
        if (await Term.CurrentDir.createChildByPath(name, false)) {
            return '';
        }
        return 'Touch failed: Target File is exist:' + name;
    } catch (e) {
        console.error(e);
        return 'Touch failed: ' + name;
    }
}

export class TouchCommand extends Command {
    commandName = 'touch';
    desc = 'Create file';
    get help () {
        return this.commandName + ' <filename>';
    }
    async run (args: string[]) {
        this.handleArgs(args);

        const name = args[0];

        if (!name) {
            return this.fail('Touch: Dir name is empty');
        }

        const error = await touchFile(name);

        if (!error) {
            return this.success(div(text('Touch File Success: ' + name)));
        }
        return this.fail(error);

    }
}
