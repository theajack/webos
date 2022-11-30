/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-29 00:16:30
 */

// import { div } from 'alins';
import { div, span, text } from 'alins';
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
            '.help-item',
            span('.help-name', item.commandName),
            span('.help-text', item.help),
            span(text(item.desc))
        )) as any;

        divs.unshift(div(
            Color.Blue,
            span('.help-name', 'Name'),
            span('.help-text', 'Useage'),
            span('Description')
        ));

        return this.success(divs);
    }
}
