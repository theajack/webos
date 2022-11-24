import { Term } from 'src/term';
import { Dir, IJson } from 'webos-disk';
/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:39:27
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:09:13
 */
export interface ICommandResult {
    success: boolean;
    error?: any;
    message: string;
    commandName: string;
    args: string[]
    result: any;
}

type ISubCommandFunc = (args: string[]) => ICommandResult;

export abstract class Command {
    commandName: string = '';
    args: string[] = [];
    subCommands: IJson<ISubCommandFunc> = {};
    desc = '';
    hint: 'custom' | 'file' | 'command' | 'none' = 'file';
    hintArray: string[] = [];

    softwareDir: Dir;

    get help () {
        return this.commandName + ' <filename|filepath>';
    }

    async init () {}

    async run (args: string[]): Promise<ICommandResult> {
        this.args = args;
        const subCommands = Object.keys(this.subCommands);
        if (args.length > 0 && subCommands.includes(this.args[0])) {
            const subCommand = this.args.shift() as string;
            return this.subCommands[subCommand].call(this, this.args);
        } else {
            return this.main(args);
        }
    }
    abstract main (args: string[]): Promise<ICommandResult>;

    success (result: any = null): ICommandResult {
        return {
            commandName: this.commandName,
            args: this.args,
            success: true,
            message: '',
            result,
        };
    }

    fail (message = '', error = null): ICommandResult {
        return {
            commandName: this.commandName,
            args: this.args,
            success: false,
            message,
            error,
            result: null,
        };
    }


    async createSoftwareDir (name = this.commandName) {
        this.softwareDir = await Term.Disk.createChildByPath(`/System/Software/${name}`, true) as Dir;
    }
}