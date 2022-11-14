/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-11 14:37:24
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-13 23:34:45
 */
import { inputContent } from 'src/state/global-info';
import { pushResultError, pushResultItem } from 'src/ui/components/result-item';
import { split } from 'webos-disk';
import { IFileBaseInfo } from 'webos-disk/src/files/base';
import { Path } from 'webos-disk/src/path';
import { getCommandNames } from './command-handler';
import { lsPathDir, lsItem, lsFilesItem } from './commands/ls';

export function onTab (value: string) {
    const name = value;
    if (value.includes(' ')) {
        const [ , arg ] = split(value, ' ');
        debugger;
        handleResult(
            value,
            Path.from(arg).last,
            lsPathDir(arg),
            'file'
        );
    } else {
        handleResult(
            value,
            name,
            getCommandNames(),
        );
    }

}

function handleResult (
    value: string,
    name: string,
    list: (string|IFileBaseInfo)[],
    type: 'file' | 'command' = 'command',
) {
    const handleItem = type === 'file' ? (v: IFileBaseInfo) => v.name : (v:string) => v;
    const result = list.filter(n => handleItem(n as any).indexOf(name) === 0);
    if (result.length === 0) {
        pushResultError(value, `No ${type} find`);
    } else if (result.length === 1) {
        let content = value.substring(0, value.lastIndexOf(name)) + handleItem(result[0] as any);
        if (type === 'file' && (result[0] as IFileBaseInfo).isDir) {
            content += '/';
        }
        inputContent.value = content;
    } else {
        const comp = type === 'file' ? lsFilesItem : lsItem;
        pushResultItem(value, result.map(i => comp(i as any)));
    }
}