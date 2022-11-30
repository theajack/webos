/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-11 14:37:24
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-29 01:15:47
 */
import { inputContent } from '../state/global-info';
import { pushResultError, pushResultItem } from '../ui/components/result-item';
import { IFileBaseInfo, Path } from 'webos-disk';
import { getCommand, getCommandNames } from './command-handler';
import { lsPathDir, lsItem, lsFilesItem } from './commands/ls';


export async function onTab (value: string, hint = false) {

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
        const [ commandName, subName ] = arr;

        const command = getCommand(commandName);
        if (!command) {
            return [];
        }

        const tabValue = arr[arr.length - 1];
        let name = tabValue;

        let list: (string|IFileBaseInfo)[] | null = null;
        let type = command.hint;

        const sub = command.subCommands[subName];
        if (typeof sub === 'object') {
            if (arr.length === 3) {
                if (sub.hint) type = sub.hint;
                if (sub.hintArray) list = sub.hintArray;
            }
        } else {
            const subs = Object.keys(command.subCommands);
            if (arr.length === 2 && subs.length > 0) {
                list = subs;
            }
        }

        if (!list) {
            if (type === 'none') {
                return [];
            }
            if (command.hintArray?.length > 0 || type === 'custom') {
                list = command.hintArray || [];
            } else if (type === 'command') {
                list = getCommandNames();
            } else if (type === 'file') {
                name = Path.from(tabValue).last;
                list = await lsPathDir(tabValue);
            }
        }

        return handleResult(
            value,
            name,
            list || [],
            type,
            hint,
        );
    }

}


function handleResult (
    value: string,
    name: string,
    list: (string|IFileBaseInfo)[],
    type: 'custom' | 'file' | 'command' | 'none' = 'custom',
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
        if (type !== 'file') {
            content += ' ';// 命令后面补一个空格
        }
        inputContent.value = content;
    } else {
        const comp = type === 'file' ? lsFilesItem : lsItem;
        pushResultItem(value, result.map(i => comp(i as any)));
    }
    return [];
}