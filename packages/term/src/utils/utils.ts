import { IJson } from 'webos-disk/src/type';

/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:06:19
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-11 06:58:28
 */
export function formatDateTime (date = new Date()) {
    return `${date.getFullYear()}-${fixNum(date.getMonth())}-${fixNum(date.getDate())} ${fixNum(date.getHours())}:${fixNum(date.getMinutes())}:${fixNum(date.getSeconds())}`;
}

function fixNum (num: number) {
    return num < 10 ? `0${num}` : num;
}

export function split (str: string, s: string): [string, string] {
    const index = str.indexOf(s);
    if (index === -1 || !s) return [ str, '' ];
    return [ str.substring(0, index), str.substring(index + 1) ];
}

export function join (array: string[], fn: string[] | ((index: number)=>string)) {
    let str = '';
    for (let i = 0; i < array.length - 1; i++) {
        str += `${array[i]}${typeof fn === 'function' ? fn(i) : fn[i]}`;
    }
    return str + array[array.length - 1];
}

export function delay (time = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

const FuncArgExp = /\(.*?\)/;
export function getFuncArgs (fn: Function) {
    return fn.toString().match(FuncArgExp)?.[0] || '';
}

export function isStringTemplateArray (data: any) {
    return data instanceof Array && (data as any).raw instanceof Array;
}

export function splitTwoPart (str: string, sep: string) {
    const index = str.indexOf(sep);
    if (index === -1) return [ str, '' ];
    return [ str.substring(0, index).trim(), str.substring(index + 1).trim() ];
}

export function joinPath (...paths: string[]) {
    let queue: string[] = [];

    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        for (let j = 0; j < path.length; j++) {
            const s = path[j];
            if (s === '/') {
                if (j === 0) {
                    queue = path.split('/').filter(name => !!name);
                    break;
                }
            } else if (s === '.') {
                if (path[j + 1] === '/') {
                    j ++;
                } else if (path[j + 1] === '.' && (path[j + 2] === '/' && j + 2 === path.length)) {
                    j += 2;
                    queue.pop();
                }
            } else {
                queue.push(...path.substring(j).split('/').filter(name => !!name));
                break;
            }
        }
    }
    return queue.join('/');
}
export function parseJSON (data: any): IJson | null {
    if (typeof data === 'object') {
        return data;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
}
