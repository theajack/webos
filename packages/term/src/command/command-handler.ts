/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:29:42
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:22:31
 */
import { splitTwoPart } from '../utils/utils';
import { IJson } from 'webos-disk';
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
import { FindCommand } from './commands/find';
import { getApplications } from './applications/applications';

const commands: IJson<Command> = {};

export function registCommand (command: Command) {
    commands[command.commandName] = command;
}


export function getCommand (name: string) {
    return commands[name];
}

let CommandList: Command[] = [];

export function initNativeCommandList () {
    CommandList = [
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
        FindCommand,
        ...getApplications()
    ].map(c => addNewCommand(c));
}

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

export function addNewCommand (command: any, install = false) {
    const item = new command() as Command;
    // ? ??????????????????????????????
    item.init().then(() => {
        item.initSubCommands();
    });
    registCommand(item);
    if (install) CommandList.push(item);
    return item;
}

export async function executeCommand (command: string) {
    const result = await handleCommand(command);
    return result;
}