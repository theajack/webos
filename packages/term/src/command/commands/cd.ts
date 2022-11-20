/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 13:17:35
 */

import { currentDirName } from '../../state/global-info';
import { Term } from '../../term';
import { Dir } from 'webos-disk/src/files/dir';
import { Path } from 'webos-disk/src/path';
import { Command } from './command-base';

export function cdPath (...args: string[]) {
    const path = Path.join(...args);
    const dir = Term.CurrentDir.findChildByPath(path);

    if (dir) {
        if (dir.type === 'file') {
            return { success: false, message: 'Target is not a directory: ' + dir.name };
        }
        currentDirName.value = dir.isDisk ? '' : dir.name;
        Term.CurrentDir = dir as Dir;
        return { success: true, message: '' };
    } else {
        return { success: false, message: 'Target not found' };
    }

}

export class CDCommand extends Command {
    commandName = 'cd';
    desc = 'Go to the directory';
    get help (): string {
        return this.commandName + ' <dirname>';
    }

    async run (args: string[]) {
        this.handleArgs(args);

        const result = cdPath(...args);

        if (result.success) {
            return this.success();
        } else {
            return this.fail(result.message);
        }
    }
}
