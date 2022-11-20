/*
 * @Author: tackchen
 * @Date: 2022-09-21 15:05:05
 * @Description: Coding something
 */

export function split (str: string, s: string = '/', last = false): [string, string] {
    const index = last ? str.lastIndexOf(s) : str.indexOf(s);
    if (index === -1 || !s) return [ str, '' ];
    return [ str.substring(0, index), str.substring(index + 1) ];
}