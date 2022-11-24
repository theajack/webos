/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:02:54
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
        return (content: string) => {
            div(text(content), color).mount(container);
        };
    };
    return {
        log: common(Color.Gray),
        error: common(Color.Fail),
        warn: common(Color.Warn),
        info: common(Color.Blue),
        table: common(Color.Gray),
        clear: () => {},
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
            mounted(dom => {
                new Function('console', '' + file.content)(createConsole(dom));
            })
        );
        return this.success(container);
    }
}
