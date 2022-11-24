/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 14:55:55
 */

// import { div } from 'alins';
import { div, span, text } from 'alins';
import { style } from 'alins-style';
import { Color } from '../../ui/css/styles/atoms';
import { getCommandInfos } from '../command-handler';
import { Command } from './command-base';


export class HelpCommand extends Command {
    commandName = 'help';
    desc = 'Get help';
    hint: 'command' = 'command';

    get help (): string {
        return this.commandName + ' <command name>';
    }

    async main (args: string[]) {
        const info = getCommandInfos();

        const name = args[0];

        const result = !!name ? (info.filter(item => item.commandName === name) || []) : info;

        if (result.length === 0) return this.fail('Command Not Found');

        const divs = result.map(item => div(
            span(style.display('inline-block').width(60), item.commandName),
            span(style.display('inline-block').width(250), item.help),
            span(text(item.desc))
        )) as any;

        divs.unshift(div(
            Color.Blue,
            span(style.display('inline-block').width(60), 'Name'),
            span(style.display('inline-block').width(250), 'Useage'),
            span('Description')
        ));

        return this.success(divs);
    }
}
