/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-13 07:57:47
 */

import { File } from 'webos-disk';
import { catFile } from '../commands/cat';
import { Command } from '../commands/command-base';
import {
    compressToEncodedURIComponent,
} from 'lz-string';

export class CodeCommand extends Command {
    commandName = 'code';
    desc = 'open file with code mode in JSBox';
    get help (): string {
        return this.commandName + ' <filename>';
    }

    async main (args: string[]) {
        const target = await catFile(args);

        if (!target) return this.fail('Target is not exist');
        if (target.isDir) return this.fail('Target is not a file');

        const file = target as File;

        if (!file.content) {
            return this.success('File content is Empty!');
        }

        const code = compressToEncodedURIComponent(file.content + ''); // todo 不同类型 toString
        window.open(`https://theajack.github.io/jsbox/?theme=dark&lang=${file.fileParser.fileType}&code=${code}`);
        return this.success('File opened successfully!');
    }
}
