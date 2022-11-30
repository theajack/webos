/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:18:55
 */

import { CommonSearchCommand } from './common-search-command';
export class GoogleCommand extends CommonSearchCommand {
    constructor ( ) {
        super(
            'google',
            (query: string) => `https://www.google.com/search?q=${query}`
        );
    }
}