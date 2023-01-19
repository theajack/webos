/*
 * @Author: tackchen
 * @Date: 2022-09-11 00:01:22
 * @Description: Coding something
 */

import { IJson } from '../type.d';
import { log } from '../lib/utils';
import { fs } from '../saver/saver';
import { split } from '../utils';
import { FileBase, IFileBaseInfo, IFileBaseOption } from './base';
import { File, IFileOption } from './file';
import { Disk } from '../disk';
import { Path } from 'webos-path';

export interface IDirOption extends IFileBaseOption {
    children?: FileBase[];
}

export interface ICreateConfig {
    returnIfExists?: boolean;
    fromInit?: boolean;
}


export class Dir extends FileBase {
    children: FileBase[] = [];
    constructor ({
        name,
        children = [],
        entry,
    }: IDirOption) {
        super({ name, entry });
        this.type = 'dir';
        this.isDir = true;
        this.children = children;
    }

    countSize () {
        let size = 0;
        this.children.forEach(child => {
            size += child.countSize();
        });
        return size;
    }

    async addChild<T extends FileBase> (file: T, fromInit = false): Promise<T> {
        file.setParent(this);
        this.children.push(file);

        if (!fromInit) { // 初始化的时候是从fs里面拿的 所以不需要重复创建
            const filePath = file.path.path;
            // console.log(filePath);
            const entry = await fs()[file.isDir ? 'mkdir' : 'createFile'](filePath);
            file.setEntry(entry);
            if (!file.isDir) {
                await (file as any as File).write();
            }
        }

        return file;
    }

    async createFile (options: IFileOption, {
        returnIfExists,
        fromInit,
    }: ICreateConfig = {
        returnIfExists: false,
        fromInit: false,
    }): Promise<File | null> {
        // console.log('createFile', options, this, this.entry);
        log('create file', options.name);
        if (this.exists(options.name)) {
            if (returnIfExists) {
                return await this.findFileByPath(options.name) as File;
            }
            log('warn', '文件已存在');
            return null;
        }
        // if(options.name === '')

        const file = await this.addChild(new File(options), fromInit);

        if (fromInit) {
            await file.read({ refresh: true });
        }
        return file;
    }

    async createChildByPath<T extends Dir|File = Dir> (path: string, isDir: boolean, returnIfExists = false): Promise<T|null> {
        const [ dirName, subName ] = split(path);
        if (subName) {
            if (!dirName) { // 根目录
                return Disk.instance.createChildByPath(subName, isDir, returnIfExists);
            } else {
                const dir = await this.createDir({ name: dirName }, { returnIfExists: true });
                return dir?.createChildByPath(subName, isDir, returnIfExists) || null;
            }
        }

        if (isDir) {
            return this.createDir({ name: dirName }, { returnIfExists }) as Promise<T|null>;
        }
        return this.createFile({ name: dirName }, { returnIfExists }) as Promise<T|null>;
    }

    async createDir (options: IDirOption, config: ICreateConfig = {
        returnIfExists: false,
        fromInit: false,
    }): Promise<null | Dir> {
        // console.log('createDir', options, this, this.entry);
        log('create dir', options.name);
        if (this.exists(options.name)) {
            if (config.returnIfExists) {
                return await this.findDirByPath(options.name);
            }
            log('warn', '目录已经存在', `${this.path.path}/${options.name}`);
            return null;
        }
        return this.addChild(new Dir(options), config.fromInit);
    }

    exists (name: string) {
        return !!this.children.find(item => item.name === name);
    }

    copy (): FileBase {
        const children = this.children.map(child => child.copy());
        return new Dir({
            name: this.name,
            children,
        });
    }

    paste (file: FileBase) {
        this.children.push(file);
    }

    async findChildByPath (
        pathValue: string | string[],
    ): Promise<Dir | File | null> {
        const path = Path.from(pathValue);
        if (path.isRoot) {
            return Disk.instance.findChildByPath(path.relative);
        }
        // ! 当文件没有实际创建好时 等待初始化完成再返回
        if (!this.entry) await this.onloaded();
        if (path.array.length === 0) return this;
        const name = path.array.shift();
        if (name === Path.Back) {
            return (this.parent || this).findChildByPath(path.array);
        }
        const file = this.children.find(file => file.name === name);
        if (!file) return null;
        if (file.isDir) return (file as Dir).findChildByPath(path.array);
        return file as File;
    }

    filerChild (query: string, deep = true) {
        const result: FileBase[] = [];

        const n = this.children.length;
        for (let i = 0; i < n; i++) {
            const child = this.children[i];
            if (child.name.indexOf(query) !== -1) {
                result.push(child);
            }
            if (deep && child.isDir) {
                result.push(...(child as Dir).filerChild(query, deep));
            }
        }
        return result;
    }

    async findFileByPath (
        path: string | string[],
    ): Promise<File | null> {
        const child = await this.findChildByPath(path);
        if (!child || child.isDir) {
            console.warn('目标不存在 或是一个文件夹而不是文件');
            return null;
        }
        return child as File;
    }

    async findDirByPath (
        path: string | string[],
    ): Promise<Dir | null> {
        const child = await this.findChildByPath(path);
        if (!child?.isDir) {
            console.warn('目标不存在 或是一个文件而不是文件夹');
            return null;
        }
        return child as Dir;
    }

    ls () {
        return this.children.map(file => file.name);
    }
    lsDetail (): IFileBaseInfo[] {
        return this.children.map(file => ({
            name: file.name,
            isDir: file.isDir,
            _size: file._size,
            path: file.path,
            id: file.id,
            fileType: file.fileType
        }));
    }

    deepLs () {
        const result: IJson = {};
        this.children.forEach(file => {
            if (file.isDir) {
                result[file.name] = (file as Dir).deepLs();
            } else {
                result[file.name] = file.name;
            }
        });
        return result;
    }
}