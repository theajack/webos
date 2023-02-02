/*
 * @Author: tackchen
 * @Date: 2022-09-12 22:45:10
 * @Description: Coding something
 */

import { Disk } from '../disk';
import { FileBase } from '../files/base';
import { DiskFiler } from './filer';


export function fs () {
    return DiskFiler.instance;
}

export const initFilerSaver = (() => {

    let CacheFiles: FileBase[] | null = null;
    let inited = false;
    let onReadyList: ((files: FileBase[])=>void)[] = [];

    return (disk: Disk) => {
        if (CacheFiles) return Promise.resolve(CacheFiles);

        return new Promise<FileBase[]>((resolve) => {

            if (inited) {
                onReadyList.push((files) => {resolve(files);});
                return;
            }

            inited = true;
            new DiskFiler({
                onready () {
                    fs().initFiles(disk).then(files => {
                        CacheFiles = files;
                        resolve(files);
                        onReadyList.forEach(fn => fn(files));
                        onReadyList = [];
                    });
                }
            });
        });


    };
})();


(window as any)._fs = fs;