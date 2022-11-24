/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-22 23:52:17
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 22:20:12
 */
class BookmarkCommand extends BaseCommand {
    commandName = 'bookmark';

    subCommands = {
        add (args) {
            console.log('add', this, args);
        },
        remove (args) {
            console.log('remove', this, args);
        }
    };

    async init () {
        // ! 同时操作会报错
        await this.createSoftwareDir();
    }

    main (args) {
        console.log('main', this, args);
    }
}

window.CustomCommand = BookmarkCommand;