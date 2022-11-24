/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-24 09:26:08
 */

import { saveFileContent } from 'src/ui/components/editor';
import { addNewCommand, executeCommand } from '../command-handler';
import { Command } from '../commands/command-base';

export const InnerThirdCommand = [
    'custom', 'custom2', 'bookmark'
];

export const LocalCommandPath = '/System/Commands';

function libNameToUrl (name: string) {
    const url = location.host.indexOf('localhost') === 0 ?
        `http://${location.host}/commands` :
        'https://cdn.jsdelivr.net/gh/theajack/webos/commands';
    return  `${url}/${name}.js`;
}

function installScript (url: string): Promise<{
  result: null|Command,
  error: string
}> {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.onload = () => {
            const command = (window as any).CustomCommand as Command;
            resolve({ result: command, error: '' });
        };
        script.onerror = () => {
            resolve({ result: null, error: 'error' });
        };
        setTimeout(() => {
            resolve({ result: null, error: 'timeout' });
        }, 5000);
        script.src = url;
        document.head.appendChild(script);
    });
}

async function getInstalledList (): Promise<string[] | null> {
    const result = await executeCommand('cat ' + LocalCommandPath);
    if (result.success) {
        try {
            return JSON.parse(result.result);
        } catch (error) {

        }
    }
    return null;
}

async function saveToLocal (url: string) {
    let list = await getInstalledList();
    if (list) {
        list.push(url);
    } else {
        const result = await executeCommand('touch ' + LocalCommandPath);
        if (result.success) {
            list = [ url ];
        } else {
            return;
        }
    }
    await saveFileContent(LocalCommandPath, JSON.stringify(list));
}

export async function installFromLocal () {
    const urls = await getInstalledList();
    if (!urls) return;
    const result = await Promise.all(urls.map(url => installScript(url)));
    result.forEach(item => {
        if (item.result) {
            addNewCommand(item.result, true);
        }
    });
}

export class InstallCommand extends Command {
    commandName = 'install';
    desc = 'Install inner libs or from url';
    hint: 'custom' = 'custom';
    hintArray = InnerThirdCommand;
    get help (): string {
        return this.commandName + ' <name|url>';
    }

    async main (args: string[]) {

        let value = args[0];

        if (value.indexOf('http') !== 0) {
            value = libNameToUrl(value);
        }

        if (!!document.querySelector(`[src="${value}"]`)) {
            return this.success(`Command ${args[0]} already installed`);
        }

        const { result, error } = await installScript(value);

        if (!result) {
            return this.fail(`Install command failed: ${error}`);
        }

        addNewCommand(result, true);

        saveToLocal(value);

        return this.success();
    }
}
