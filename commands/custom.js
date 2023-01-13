/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-22 23:52:17
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:06:19
 */
class CustomCommand extends BaseCommand {
    commandName = 'custom';

    subCommands = {
        test () {
            console.log('test', this.commandName);
        },
        test2 () {
            console.log('test', this.commandName);
        }
    };

    async main () {
        console.log('main');
    }
}

window.CustomCommand = CustomCommand;