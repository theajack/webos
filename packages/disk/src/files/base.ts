/*
 * @Author: tackchen
 * @Date: 2022-09-11 00:01:27
 * @Description: Coding something
 */

import { Path } from 'webos-path';
import { timeId } from '../lib/utils';
import { fs } from '../saver/saver';
import { Dir } from './dir';

export interface IFileBaseOption {
    name: string,
    entry?: any,
}

export interface IFileBaseInfo {
    id: string;
    name: string;
    _size: number;
    isDir: boolean;
    path: Path;
    fileType: '' | 'unknown' | string; // '' 表示文件夹
}

export abstract class FileBase implements IFileBaseInfo {
    isDisk = false;
    id: string;
    name: string;
    type: 'file' | 'dir' | 'disk';
    isDir = false;
    path: Path;
    fileType: '' | 'unknown' | string;

    entry: any; // 第三方底层file对象，本项目中是filer中的entry

    _size = -1; // 当_size 为 -1 时，会重新计算 size
    get size () {
        if (this._size < 0) {
            this._size = this.countSize();
        }
        return this._size;
    }

    parent: Dir | null;

    loadedCallback: Function[] = [];

    triggerLoaded () {
        this.loadedCallback.forEach(fn => {fn();});
        this.loadedCallback = [];
    }

    onloaded () {
        return new Promise(resolve => {
            this.loadedCallback.push(() => {
                resolve(true);
            });
        });
    }

    constructor ({
        name = '',
        entry = null,
    }: IFileBaseOption) {
        this.id = timeId();
        this.entry = entry;
        this.name = name;
    }


    setEntry (entry: any) {
        this.entry = entry;
        this.triggerLoaded();
    }

    setParent (parent: Dir | null) {
        this.parent = parent;
        if (parent) {
            this.path = parent.path.join(this.name);
            // console.warn(this.path.path);
        }
    }

    async remove () {
        if (!this.parent) return false;

        const list = this.parent.children;

        const index = list.findIndex(child => child === this);

        if (index === -1) {
            console.warn('文件未找到');
            return false;
        }

        list.splice(index, 1);

        this.markParentClearSize();
        return fs().rm(this.path.path); // , this.isDir
    }

    private markParentClearSize () {
        let parent = this.parent;

        while (parent) {
            parent._size = -1;
            parent = parent.parent;
        }
    }

    abstract copy(): FileBase;

    abstract countSize(): number;
}