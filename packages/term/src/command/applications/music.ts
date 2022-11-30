/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 18:37:32
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:20:30
 */

import { CommonSearchCommand } from './common-search-command';
export class MusicCommand extends CommonSearchCommand {
    constructor ( ) {
        super(
            'music',
            (query: string) => `https://music.163.com/#/search/m/?s=${query}`
        );
    }
}