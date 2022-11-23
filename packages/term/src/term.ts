/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:56:02
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 09:02:29
 */

import { Disk, Dir } from 'webos-disk';
import { installFromLocal } from './command/applications/install';
import { initNativeCommandList } from './command/command-handler';
import { UI } from './ui';

interface ITermOptions {
    container?: string|HTMLElement;
}

export class Term {
    static instance: Term;

    disk: Disk;

    currentDir: Dir;

    ui: UI;

    constructor ({
        container = 'body'
    }: ITermOptions = {}) {
        if (Term.instance) return Term.instance;
        this.disk = new Disk();
        this.currentDir = this.disk;
        this.ui = new UI(container);
        Term.instance = this;
    }

    async init () {
        await this.disk.initFileSystem();
        // console.log(this.disk.deepLs());
        initNativeCommandList();
        installFromLocal();
    }

    static get CurrentDir () {
        return this.instance.currentDir;
    }
    static set CurrentDir (dir: Dir) {
        this.instance.currentDir = dir;
    }

    static get CurrentPath () {
        return this.CurrentDir.path.path;
    }
}

export async function createTerm (options?: ITermOptions) {
    if (Term.instance) return Term.instance;
    const os = new Term(options);
    await os.init();
    return os;
}