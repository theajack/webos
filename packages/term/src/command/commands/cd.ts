/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 20:39:06
 */

import { currentDirName, currentPath } from 'src/state/global-info';
import { getTermInstance } from 'src/term';
import { joinPath } from 'src/utils/utils';
import { Dir } from 'webos-disk/src/files/dir';
import { Command } from './command-base';

export class CDCommand extends Command {
    name = 'cd';

    async run (args: string[]) {
        this.args = args;

        const path = joinPath(currentPath.value, ...args);

        console.warn(path);

        const dir = getTermInstance().disk.findFileByPath(path);
        if (dir) {
            if (dir.type === 'file') {
                return this.fail('Target is not a directory: ' + dir.name);
            }
            currentDirName.value = dir.isDisk ? '' : dir.name;
            currentPath.value = path;
            getTermInstance().currentDir = dir as Dir;
            return this.success();
        } else {
            return this.fail('Target not found');
        }
    }
}
