/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:16:01
 */

import { Command } from '../commands/command-base';

export class CommonSearchCommand extends Command {

    replace: (query: string) => string;

    constructor (name: string, replace: (query: string) => string) {
        super();
        this.commandName = name;
        this.desc = 'Search with ' + name;
        this.replace = replace;
    }

    async main (args: string[]) {
        window.open(this.replace(args.join(' ')));
        return this.success();
    }
}