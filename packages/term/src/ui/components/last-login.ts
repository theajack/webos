/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:04:45
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-11 07:01:34
 */
import { div } from 'alins';
import { style } from 'alins-style';
import { Storage } from 'src/utils/storage';
import { formatDateTime } from 'src/utils/utils';

export function LastLogin () {
    const key = 'last_login';
    const lastLoginTime = Storage.read(key);
    Storage.write(key, formatDateTime());
    return div(
        lastLoginTime ? `Last login: ${lastLoginTime}` : 'First Login!',
        style.marginBottom(20)
    );
}