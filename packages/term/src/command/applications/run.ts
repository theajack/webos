/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-13 07:42:24
 */

// import { div } from 'alins';
import { div, mounted, text } from 'alins';
import { EditorStyle } from '../../ui/css/main-css';
import { Color } from '../../ui/css/styles/atoms';
import { File } from 'webos-disk';
import { catFile } from '../commands/cat';
import { Command } from '../commands/command-base';

function createConsole (container: HTMLElement) {
    const common = (color: any) => {
        return (...args: any[]) => {
            const str = args.map(item => {
                return typeof item === 'string' ? item : JSON.stringify(item);
            }).join('\n');
            div(text(str), color).mount(container);
        };
    };
    return {
        log: common(Color.Gray),
        error: common(Color.Fail),
        warn: common(Color.Warn),
        info: common(Color.Blue),
        table: common(Color.Gray),
        clear: () => {
            container.innerHTML = '';
        },
    };
}


export class RunCommand extends Command {
    commandName = 'run';
    desc = 'run js file, use console to log result';
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
        const container = div(
            div(Color.Success, text(`Running: ${file.path.path}`)),
            div(EditorStyle.join({ minHeight: 'auto' }), text(file.content + '')),
            div(mounted(dom => {
                const process = { env: 'WEBOS', argv: [ 'run', ...args ] };
                new Function('console', 'process', '' + file.content)(createConsole(dom), process);
            }))
        );
        return this.success(container);
    }
}
