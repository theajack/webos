/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:29:42
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 23:49:23
 */
import { splitTwoPart } from 'src/utils/utils';
import { IJson } from 'webos-disk/src/type';
import { CDCommand } from './commands/cd';
import { ClearCommand } from './commands/clear';
import { Command, ICommandResult } from './commands/command-base';
import { LSCommand } from './commands/ls';
import { PWDCommand } from './commands/pwd';
import { MkdirCommand } from './commands/mkdir';

const commands: IJson<Command> = {};

export function registCommand (command: Command) {
    commands[command.commandName] = command;
}

const CommandList = [
    ClearCommand,
    LSCommand,
    CDCommand,
    PWDCommand,
    MkdirCommand,
].map(c => new c());

export function getCommandNames () {
    return CommandList.map(command => (command.commandName));
}

export function initCommands () {
    CommandList.forEach(command => {registCommand(command);});
}

export async function handleCommand (value: string): Promise<ICommandResult> {
    const [ name, args ] = splitTwoPart(value.trim(), ' ');
    console.log('Command: ' + name, args);
    if (!commands[name]) {
        return {
            success: false,
            message: `command not found: ${name}`,
            commandName: name,
            args: [],
            result: null,
        };
    }

    return commands[name].run(args.split(' '));
}