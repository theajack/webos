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
import { Disk } from 'src/disk';
import { Path } from 'src/path';

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
            console.log(filePath);
            const entry = await fs()[file.isDir ? 'mkdir' : 'createFile'](filePath);
            this.setEntry(entry);
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
        log('create file', options.name);
        if (this.exists(options.name)) {
            if (returnIfExists) {
                return this.findFileByPath(options.name) as File;
            }
            log('warn', '文件已存在');
            return null;
        }
        const file = await this.addChild(new File(options), fromInit);

        if (fromInit) {
            await file.read({ refresh: true });
        }
        return file;
    }

    async createChildByPath<T extends Dir|File = Dir> (path: string, isDir: boolean): Promise<T|null> {
        const [ dirName, subName ] = split(path);
        if (subName) {
            if (!dirName) { // 根目录
                return Disk.instance.createChildByPath(subName, isDir);
            } else {
                const dir = await this.createDir({ name: dirName }, { returnIfExists: true });
                return dir?.createChildByPath(subName, isDir) || null;
            }
        }

        if (isDir) {
            return this.createDir({ name: dirName }, { returnIfExists: false }) as Promise<T|null>;
        }
        return this.createFile({ name: dirName }) as Promise<T|null>;
    }

    async createDir (options: IDirOption, config: ICreateConfig = {
        returnIfExists: false,
        fromInit: false,
    }): Promise<null | Dir> {
        log('create dir', options.name);
        if (this.exists(options.name)) {
            if (config.returnIfExists) {
                return this.findDirByPath(options.name);
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

    findChildByPath (
        pathValue: string | string[],
    ): Dir | File | null {
        const path = Path.from(pathValue);
        debugger;
        if (path.isRoot) {
            return Disk.instance.findChildByPath(path.relative);
        }
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

    findFileByPath (
        path: string | string[],
    ): File | null {
        const child = this.findChildByPath(path);
        if (!child || child.isDir) {
            console.warn('目标不存在 或是一个文件夹而不是文件');
            return null;
        }
        return child as File;
    }

    findDirByPath (
        path: string | string[],
    ): Dir | null {
        const child = this.findChildByPath(path);
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