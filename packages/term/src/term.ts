/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:56:02
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 19:54:06
 */

import { Disk } from 'webos-disk';
import { Dir } from 'webos-disk/src/files/dir';
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
        console.log(this.disk.deepLs());
    }
}

export function getTermInstance () {
    return Term.instance;
}
export async function createTerm (options?: ITermOptions) {
    if (Term.instance) return Term.instance;
    const os = new Term(options);
    await os.init();
    return os;
}