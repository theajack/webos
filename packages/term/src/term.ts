/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 22:56:02
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-09 23:06:22
 */

import { Disk } from 'webos-disk';

export class Term {
    static instance: Term;

    disk: Disk;

    ui: UI;

    constructor () {
        if (Term.instance) return Term.instance;
        this.disk = new Disk();

    }

    async init () {
        await this.disk.initFileSystem();
        console.log(this.disk.deepLs());
    }
}

export function getTermInstance () {
    return Term.instance;
}
export async function createTerm () {
    if (Term.instance) return Term.instance;
    const os = new Term();
    await os.init();
    return os;
}