/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-22 23:52:17
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 09:12:22
 */
class Custom2Command extends BaseCommand {
    commandName = 'custom2';
    async run () {
        const {
            saveFileContent
        } = TermBridge;

        saveFileContent('/custom2.txt', 'hahaha');
    }
}

window.CustomCommand = Custom2Command;