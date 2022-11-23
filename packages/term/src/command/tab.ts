/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-11 14:37:24
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-22 23:17:44
 */
import { inputContent } from '../state/global-info';
import { pushResultError, pushResultItem } from '../ui/components/result-item';
import { IFileBaseInfo, Path } from 'webos-disk';
import { getCommand, getCommandNames } from './command-handler';
import { lsPathDir, lsItem, lsFilesItem } from './commands/ls';

export function onTab (value: string, hint = false) {

    const arr = value.split(' ');

    if (arr.length === 1) {
        const tabValue = arr[0];
        return handleResult(
            value,
            tabValue,
            getCommandNames(),
            'command',
            hint,
        );
    } else {
        const commandName = arr[0];

        const command = getCommand(commandName);
        if (!command) {
            debugger;
            return [];
        }

        const type = command.hint;

        if (type === 'none') {
            return [];
        }

        const tabValue = arr[arr.length - 1];

        let name = tabValue;
        let list: (string|IFileBaseInfo)[] = [];

        if (type === 'custom') {
            list = command.hintArray;
        } else if (type === 'command') {
            list = getCommandNames();
        } else if (type === 'file') {
            name = Path.from(tabValue).last;
            list = lsPathDir(tabValue);
        }

        return handleResult(
            value,
            name,
            list,
            type,
            hint,
        );
    }

}


function handleResult (
    value: string,
    name: string,
    list: (string|IFileBaseInfo)[],
    type: 'custom' | 'file' | 'command' = 'custom',
    hint: boolean = false
) {
    const handleItem = type === 'file' ? (v: IFileBaseInfo) => v.name : (v:string) => v;
    const result = list.filter(n => handleItem(n as any).indexOf(name) === 0);
    if (hint) return result.map(item => handleItem(item as any));

    if (result.length === 0) {
        pushResultError(value, `No ${type} found`);
    } else if (result.length === 1) {

        // 处理 cd .. 只有一个目录的情况 补全最后一个 /
        const index = value.lastIndexOf(Path.Back);
        const split = index !== -1 && index === value.length - Path.Back.length ? Path.Split : '';

        let content = value.substring(0, value.lastIndexOf(name)) + split + handleItem(result[0] as any);
        if (type === 'file' && (result[0] as IFileBaseInfo).isDir) {
            content += '/';
        }
        if (type === 'command') {
            content += ' ';// 命令后面补一个空格
        }
        inputContent.value = content;
    } else {
        const comp = type === 'file' ? lsFilesItem : lsItem;
        pushResultItem(value, result.map(i => comp(i as any)));
    }
    return [];
}