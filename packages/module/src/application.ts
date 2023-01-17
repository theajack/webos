/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:48:58
 * @Description: Coding something
 */

import { Module } from './module';


export class Application {

    entry: Module;

    constructor (entry: string) {
        this.entry = new Module(entry, 'code');
    }

    run () {

    }
}