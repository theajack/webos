/*
 * @Author: tackchen
 * @Date: 2022-09-21 15:05:05
 * @Description: Coding something
 */

export function split (str: string, s: string = '/'): [string, string] {
    const index = str.indexOf(s);
    if (index === -1 || !s) return [ str, '' ];
    return [ str.substring(0, index), str.substring(index + 1) ];
}