/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 13:16:56
 */

// import { div } from 'alins';
import { Dir } from 'webos-disk';
import { catFile } from './cat';
import { Command } from './command-base';

export class CpCommand extends Command {
    commandName = 'cp';
    desc = 'Copy file or directory';
    get help (): string {
        return this.commandName + ' <source> <target>';
    }

    async main (args: string[]) {
        const [ sourcePath, targetPath ] = args;

        if (!sourcePath) return this.fail('Source path is empty!');
        if (!targetPath) return this.fail('Target path is empty!');

        const source = await catFile(sourcePath);

        if (!source) return this.fail('Source is not exist');
        const target = await catFile(targetPath);

        if (!target) return this.fail('Target is not exist');
        if (!target.isDir) return this.fail('Target is not a directory');

        (target as Dir).paste(source.copy());

        return this.success(`Copy success ${source.path.path} => ${target.path.path}${source.path.path}`);
    }
}
