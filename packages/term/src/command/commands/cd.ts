/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-24 08:45:46
 */

import { currentDirName } from '../../state/global-info';
import { Term } from '../../term';
import { Dir, Path } from 'webos-disk';
import { Command } from './command-base';

export async function cdPath (...args: string[]) {
    const path = Path.join(...args);
    const dir = await Term.CurrentDir.findChildByPath(path);

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

    async main (args: string[]) {
        const result = await cdPath(...args);

        if (result.success) {
            return this.success();
        } else {
            return this.fail(result.message);
        }
    }
}
