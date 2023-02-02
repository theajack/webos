/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:56:02
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-02 09:22:59
 */

import { Disk, Dir } from 'webos-disk';
import { installFromLocal } from './command/applications/install';
import { CommandManager } from './command/command-handler';
import { UI } from './ui';

interface ITermOptions {
    container?: string|HTMLElement;
}

export class Term {

    static List: Term[] = [];

    disk: Disk;

    currentDir: Dir;

    ui: UI;

    commands: CommandManager;

    constructor ({
        container = 'body'
    }: ITermOptions = {}) {
        this.disk = new Disk();
        this.currentDir = this.disk;
        this.ui = new UI(container, this);

        Term.List.push(this);
    }

    destory () {
        this.commands.destory();
        Term.List.splice(Term.List.indexOf(this), 1);
    }

    execute (command: string) {
        return this.commands.executeCommand(command);
    }

    async init () {
        await this.disk.initFileSystem();
        // console.log(this.disk.deepLs());
        this.commands = new CommandManager(this);
        installFromLocal(this);
    }

    get currentPath () {
        return this.currentDir.path.path;
    }
}

export async function createTerm (options?: ITermOptions) {
    const os = new Term(options);
    await os.init();
    return os;
}