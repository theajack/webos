/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-22 23:52:17
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:10:04
 */
class Custom2Command extends BaseCommand {
    commandName = 'custom2';
    async main () {
        const {
            saveFileContent
        } = TermBridge;

        saveFileContent('/custom2.txt', 'hahaha');
    }
}

window.CustomCommand = Custom2Command;