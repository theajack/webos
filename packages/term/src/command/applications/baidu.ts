/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:06:01
 */

import { Command } from '../commands/command-base';

export class BaiduCommand extends Command {
    commandName = 'baidu';
    desc = 'Search with baidu';
    hint: 'none' = 'none';
    get help (): string {
        return this.commandName + ' <content>';
    }

    async main (args: string[]) {
        window.open(`https://www.baidu.com/s?wd=${args.join(' ')}`);
        return this.success();
    }
}
