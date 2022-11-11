/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:29:42
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 20:42:10
 */
import { splitTwoPart } from 'src/utils/utils';
import { IJson } from 'webos-disk/src/type';
import { CDCommand } from './commands/cd';
import { ClearCommand } from './commands/clear';
import { Command, ICommandResult } from './commands/command-base';
import { LSCommand } from './commands/ls';
import { PWDCommand } from './commands/pwd';

const commands: IJson<Command> = {};

export function registCommand (command: Command) {
    commands[command.name] = command;
}

export function initCommands () {
    [
        ClearCommand,
        LSCommand,
        CDCommand,
        PWDCommand,
    ].forEach(command => {registCommand(new command());});
}


export async function handleCommand (value: string): Promise<ICommandResult> {
    const [ name, args ] = splitTwoPart(value.trim(), ' ');
    console.log('Command: ' + name, args);
    if (!commands[name]) {
        return {
            success: false,
            message: `command not found: ${name}`,
            name,
            args: [],
            result: null,
        };
    }

    return commands[name].run(args.split(' '));
}