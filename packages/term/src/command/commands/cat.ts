/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:07:20
 */

// import { div } from 'alins';
import { div, text } from 'alins';
import { CommonStyle } from '../../ui/css/main-css';
import { File, Path } from 'webos-disk';
import { Term } from '../../term';
import { Command } from './command-base';
import { style } from 'alins-style';

export function catFile (args: string|string[]) {
    const path = typeof args === 'string' ? Path.join([ args ]) : Path.join(...args);
    return Term.CurrentDir.findChildByPath(path);
}

export class CatCommand extends Command {
    commandName = 'cat';
    desc = 'Displat file content';
    get help (): string {
        return this.commandName + ' <filename>';
    }

    async main (args: string[]) {
        const target = await catFile(args);

        if (!target) return this.fail('Target is not exist');
        if (target.isDir) return this.fail('Target is not a file');

        const file = target as File;

        const content = file.contentString;

        if (!content) {
            return this.success(div(
                CommonStyle.SuccessColor,
                'File content is empty'
            ));
        }

        return this.success(
            div(
                style.whiteSpace('pre'),
                text(content)
            )
        );
    }
}
