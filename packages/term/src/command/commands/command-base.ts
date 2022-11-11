/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:39:27
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 19:51:30
 */
export interface ICommandResult {
    success: boolean;
    error?: any;
    message: string;
    name: string;
    args: string[]
    result: any;
}

export abstract class Command {

    name: string = '';
    args: string[] = [];

    success (result: any = null): ICommandResult {
        return {
            name: this.name,
            args: this.args,
            success: true,
            message: '',
            result,
        };
    }

    fail (message = '', error = null): ICommandResult {
        return {
            name: this.name,
            args: this.args,
            success: false,
            message,
            error,
            result: null,
        };
    }

    abstract run (args: string[]): Promise<ICommandResult>;
}