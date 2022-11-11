/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 19:56:49
 */

import { span } from 'alins';
import { style } from 'alins-style';
import { getTermInstance } from 'src/term';
import { Dir } from 'webos-disk/src/files/dir';
import { Command } from './command-base';

function lsItem (name: string) {
    return span(
        style.marginRight(20),
        name.replace(/\./, '_')
    );
}

export class LSCommand extends Command {
    name = 'ls';

    async run (args: string[]) {
        this.args = args;

        const dir = (args[0]) ?
            getTermInstance().disk.findFileByPath(args[0]) :
            getTermInstance().currentDir;
        if (dir) {
            if (dir.type === 'file') {
                return this.fail('Target is not a directory: ' + dir.name);
            }
            return this.success((dir as Dir).ls().map(name => lsItem(name)));
        } else {
            return this.fail('history not found');
        }
    }
}
