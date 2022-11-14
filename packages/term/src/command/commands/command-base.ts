/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:39:27
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 18:04:34
 */
export interface ICommandResult {
    success: boolean;
    error?: any;
    message: string;
    commandName: string;
    args: string[]
    result: any;
}

export abstract class Command {

    commandName: string = '';
    args: string[] = [];
    subCommands: string[] = [];
    subCommand = '';

    handleArgs (args: string[]) {
        this.args = args;
        this.subCommand = '';
        if (args.length > 0 && this.subCommands.includes(this.args[0])) {
            this.subCommand = this.args.shift() as string;
        }
    }

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

    abstract run (args: string[]): Promise<ICommandResult>;
}