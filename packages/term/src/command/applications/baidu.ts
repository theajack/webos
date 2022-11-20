/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 16:12:02
 */

// import { div } from 'alins';
import { div } from 'alins';
import { CommonStyle } from '../../ui/css/main-css';
import { File, Path } from 'webos-disk';
import { Term } from '../../term';
import { Command } from '../commands/command-base';

export function catFile (args: string|string[]) {
    const path = typeof args === 'string' ? Path.join([ args ]) : Path.join(...args);
    return Term.CurrentDir.findChildByPath(path);
}

export class BaiduCommand extends Command {
    commandName = 'baidu';
    desc = 'Search with baidu';
    get help (): string {
        return this.commandName + ' <filename>';
    }

    async run (args: string[]) {
        this.handleArgs(args);

        const target = catFile(args);

        if (!target) return this.fail('Target is not exist');
        if (target.isDir) return this.fail('Target is not a file');

        const file = target as File;

        if (!file.content) {
            return this.success(div(
                CommonStyle.SuccessColor,
                'File content is empty'
            ));
        }

        return this.success(file.content);
    }
}
