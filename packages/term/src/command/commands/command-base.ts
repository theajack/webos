import { Term } from '../../term';
import { parseJSON } from '../../utils/utils';
import { Dir, File, IJson } from 'webos-disk';
/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:39:27
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-12-01 10:13:35
 */
export interface ICommandResult {
    success: boolean;
    error?: any;
    message: string;
    commandName: string;
    args: string[]
    result: any;
}

type ISubCommandFunc = (this: Command, args: string[]) => Promise<ICommandResult>;

interface ISubCommandObject {
    hint?: 'custom' | 'file' | 'command' | 'none';
    hintArray?: string[];
    help?: string;
    main(this: Command, args: string[], sub: ISubCommandObject): Promise<ICommandResult>;
    init?(this: Command, sub: ISubCommandObject): Promise<void>;
}

export type ISubCommands = IJson<ISubCommandFunc | ISubCommandObject>;

export abstract class Command {
    commandName: string = '';
    args: string[] = [];
    subCommands: ISubCommands = {};

    get subNames () {
        return Object.keys(this.subCommands);
    }

    desc = '';
    hint: 'custom' | 'file' | 'command' | 'none' = 'file';
    hintArray: string[] = [];

    softwareDir: Dir;

    files: IJson<File> = {};

    get help () {
        return this.commandName + ' <filename|filepath>';
    }

    async init () {}

    async run (args: string[]): Promise<ICommandResult> {
        this.args = args;
        const subCommands = Object.keys(this.subCommands);
        if (args.length > 0 && subCommands.includes(this.args[0])) {
            const subCommand = this.args.shift() as string;
            const sub = this.subCommands[subCommand];
            if (typeof sub === 'function') {
                return await sub.call(this, this.args);
            }
            return await sub.main.call(this, this.args, sub);
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

    noMainCommand () {
        return this.fail('Please use sub command: ' + this.help);
    }


    async createSoftwareDir (name = this.commandName) {
        this.softwareDir = await Term.Disk.createChildByPath(`/System/Software/${name}`, true, true) as Dir;
    }
    async createSoftwareFile (name: string) {
        if (!name) throw new Error('File name is Empty: ' + name);
        if (name in this.files) throw new Error('File is already exists: ' + name);
        this.files[name] = await Term.Disk.createChildByPath(`/System/Software/${this.commandName}/${name}`, false, true) as File;
        return this.files[name];
    }

    initSubCommands () {
        if (Object.keys(this.subCommands).length > 0) {
            for (const k in this.subCommands) {
                const sub = this.subCommands[k];
                if (typeof sub === 'object' && typeof sub.init === 'function') {
                    sub.init.call(this, sub);
                }
            }
        }
    }

    readSubJson (name: string) {
        const file = this.files[name];
        if (!file) return null;
        return typeof file.content === 'string' ? parseJSON(file.content) : null;
    }

    async appendSubJson (name: string, key: string, value: any) {
        const json = this.readSubJson(name) || {};
        json[key] = value;
        await this.writeSubJson(name, json);
    }
    async writeSubJson (name: string, json: object) {
        await this.files[name]?.write({ content: JSON.stringify(json) });
    }

    getSub (name: string) {
        return (this.subCommands[name] as ISubCommandObject);
    }
}