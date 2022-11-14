/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-13 23:39:28
 */

import { currentDirName } from 'src/state/global-info';
import { Term } from 'src/term';
import { Dir } from 'webos-disk/src/files/dir';
import { Path } from 'webos-disk/src/path';
import { Command } from './command-base';

// todo fix cd tab
// cd .. tab
// cd aa cd / tab
// 上下翻页翻到最新的没有空的
// 单元测试

export function cdPath (...args: string[]) {
    debugger;
    const path = Path.join(...args);
    const dir = Term.CurrentDir.findChildByPath(path);
    debugger;

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
