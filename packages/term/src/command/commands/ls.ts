/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-13 23:24:50
 */

import { span, text } from 'alins';
import { style } from 'alins-style';
import { Term } from 'src/term';
import { IFileBaseInfo } from 'webos-disk/src/files/base';
import { Dir } from 'webos-disk/src/files/dir';
import { Path } from 'webos-disk/src/path';
import { Command } from './command-base';

export function lsItem (name: string) {
    return span(
        style.marginRight(20),
        text(name)
    );
}
export function lsFilesItem (info: IFileBaseInfo) {
    // todo 可以针对文件信息做更详细的展示
    return span(
        style.marginRight(20),
        text(info.name)
    );
}


export class LSCommand extends Command {
    commandName = 'ls';

    async run (args: string[]) {
        this.handleArgs(args);

        const dir = Term.CurrentDir.findDirByPath(Path.join(args[0]));

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

// 打印目标目录的子文件 / 后面的会被忽略
export function lsPathDir (value: string) {
    const path = Term.CurrentDir.path.join(value).parentPath;
    console.warn('parent=', Term.CurrentDir.path, value, path);
    return Term.CurrentDir.findDirByPath(path)?.lsDetail() || [];
}
