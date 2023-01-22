/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-23 09:03:09
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 09:13:05
 */
import { Term } from '../term';
import { saveFileContent } from '../ui/components/editor';
import { Path } from 'webos-disk';
import { executeCommand } from './command-handler';
import { Command } from './commands/command-base';

(window as any).TermBridge = {
    getTerm: () => Term.instance,
    getDisk: () => Term.instance.disk,
    Path,
    executeCommand,
    async saveFileContent (path: string, content: string) {
        await executeCommand('touch ' + path);
        await saveFileContent(path, content);
    }
};
(window as any).BaseCommand = Command;
