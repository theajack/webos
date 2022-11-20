/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 16:19:05
 */

import { Command } from '../commands/command-base';

export class BaiduCommand extends Command {
    commandName = 'baidu';
    desc = 'Search with baidu';
    hint: 'none' = 'none';
    get help (): string {
        return this.commandName + ' <content>';
    }

    async run (args: string[]) {
        this.handleArgs(args);

        window.open(`https://www.baidu.com/s?wd=${args.join(' ')}`);

        return this.success();
    }
}
