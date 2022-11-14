import { IJson } from 'webos-disk/src/type';

/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:06:19
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-11 14:30:15
 */
export function formatDateTime (date = new Date()) {
    return `${date.getFullYear()}-${fixNum(date.getMonth())}-${fixNum(date.getDate())} ${fixNum(date.getHours())}:${fixNum(date.getMinutes())}:${fixNum(date.getSeconds())}`;
}

function fixNum (num: number) {
    return num < 10 ? `0${num}` : num;
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

export function splitTwoPart (str: string, sep: string = ' ') {
    const index = str.indexOf(sep);
    if (index === -1) return [ str, '' ];
    return [ str.substring(0, index).trim(), str.substring(index + 1).trim() ];
}
export function splitThreePart (str: string, sep: string = ' ') {
    const [ name, args ] = splitTwoPart(str, sep);
    return [ name, args, splitLastValue(args, sep) ];
}

export function splitLastValue (str: string, sep: string = ' ') {
    return str.substring(str.lastIndexOf(sep) + 1);
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