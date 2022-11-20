/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:29:42
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 14:50:46
 */
import { splitTwoPart } from '../utils/utils';
import { IJson } from 'webos-disk/src/type';
import { CDCommand } from './commands/cd';
import { ClearCommand } from './commands/clear';
import { Command, ICommandResult } from './commands/command-base';
import { LSCommand } from './commands/ls';
import { PWDCommand } from './commands/pwd';
import { MkdirCommand } from './commands/mkdir';
import { TouchCommand } from './commands/touch';
import { VimCommand } from './commands/vim';
import { CatCommand } from './commands/cat';
import { RmCommand } from './commands/rm';
import { CpCommand } from './commands/cp';
import { PingCommand } from './commands/ping';
import { HelpCommand } from './commands/help';
import { RunCommand } from './commands/run';
import { FindCommand } from './commands/find';

const commands: IJson<Command> = {};

export function registCommand (command: Command) {
    commands[command.commandName] = command;
}

const map: IJson<Command> = {};

export function getCommand (name: string) {
    return map[name];
}

const CommandList = [
    ClearCommand,
    LSCommand,
    CDCommand,
    PWDCommand,
    MkdirCommand,
    TouchCommand,
    VimCommand,
    CatCommand,
    RmCommand,
    CpCommand,
    PingCommand,
    HelpCommand,
    RunCommand,
    FindCommand,
].map(c => {
    const command = new c();
    map[command.commandName] = command;
    return command;
});

export function getCommandInfos () {
    return CommandList.map(command => {
        return {
            commandName: command.commandName,
            help: command.help,
            desc: command.desc,
        };
    });
}

export function getCommandNames () {
    return CommandList.map(command => (command.commandName));
}

export function initCommands () {
    CommandList.forEach(command => {registCommand(command);});
}

export async function handleCommand (value: string): Promise<ICommandResult> {
    const [ name, args ] = splitTwoPart(value.trim(), ' ');
    // console.log('Command: ' + name, args);
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