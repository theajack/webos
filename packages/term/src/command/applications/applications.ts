/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-30 22:11:34
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-30 22:21:49
 */

import { RunCommand } from './run';
import { BaiduCommand } from './baidu';
import { GoogleCommand } from './google';
import { OpenCommand } from './open';
import { InstallCommand } from './install';
import { BookmarkCommand } from './bookmark';
import { MusicCommand } from './music';
export function getApplications () {
    return [
        RunCommand,
        BaiduCommand,
        GoogleCommand,
        BookmarkCommand,
        OpenCommand,
        InstallCommand,
        MusicCommand,
    ];
}