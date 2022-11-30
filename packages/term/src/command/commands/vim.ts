/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:06:54
 */

// import { div } from 'alins';
import { Edit } from '../../state/global-info';
import { Term } from '../../term';
import { File, Path } from 'webos-disk';
import { catFile } from './cat';
import { Command } from './command-base';
import { touchFile } from './touch';

export class VimCommand extends Command {
    commandName = 'vim';
    desc = 'Edit file content';
    get help () {
        return this.commandName + ' <filename>';
    }
    async main (args: string[]) {
        const target = await catFile(args);

        let content = '';
        let fromTouch = false;
        if (!target) {
            const error = await touchFile(args[0]);
            if (error) return this.fail(error);
            fromTouch = true;
        } else {
            if (target.isDir) return this.fail('Target is not a file');
            const file = target as File;
            content = file.contentString;
        }

        setTimeout(() => {
            const path = target ? target.path.path : Path.join(Term.CurrentPath, args[0]);
            Edit.enterEdit(path, content, fromTouch);
        });

        return this.success();
    }
}
