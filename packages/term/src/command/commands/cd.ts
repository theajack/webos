/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 09:08:31
 */

import { currentDirName } from '../../state/global-info';
import { Dir, Path } from 'webos-disk';
import { Command } from './command-base';

export async function cdPath (args: string[], dir: Dir) {
    const path = Path.join(...args);
    const targerDir = await dir.findChildByPath(path);

    if (targerDir) {
        if (targerDir.type === 'file') {
            return { success: false, message: 'Target is not a directory: ' + targerDir.name };
        }
        currentDirName.value = targerDir.isDisk ? '' : targerDir.name;
        return { success: true, message: '', targerDir };
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
        const result = await cdPath(args, this.curDir);

        if (result.success) {
            // @ts-ignore
            this.term.currentDir = result.targerDir;
            return this.success();
        } else {
            return this.fail(result.message);
        }
    }
}
