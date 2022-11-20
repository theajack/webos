/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:04:45
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 15:51:49
 */
import { a, div, span } from 'alins';
import { style } from 'alins-style';
import { Storage } from '../../utils/storage';
import { formatDateTime } from '../../utils/utils';
import { Color } from '../css/styles/atoms';

export function LastLogin () {
    const key = 'last_login';
    const lastLoginTime = Storage.read(key);
    Storage.write(key, formatDateTime());
    return div(
        style.marginBottom(20),
        div(style.marginBottom(5), lastLoginTime ? `Last login: ${lastLoginTime}` : 'First Login!'),
        div(
            style.marginBottom(10),
            a('Web-OS', Color.Blue, '[href=https://github.com/theajack/webos]'),
            span(' made by '),
            a('theajack', Color.Blue, '[href=https://github.com/theajack]'),
            span(', UI is Powered by '),
            a('alins', Color.Blue, '[href=https://github.com/alinsjs/alins]'),
        ),
        div('Use `help` command to Start!'),
    );
}