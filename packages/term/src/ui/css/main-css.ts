/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 10:44:34
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 20:58:53
 */
import { css, style } from 'alins-style';
import { CommonFont } from './styles/atoms';

export const CommonStyle = {
    FontSize: 16,
};

css('body')(
    style.backgroundColor('#111')
        .color('#fff')
        .fontSize(CommonStyle.FontSize)
        .margin(0).padding(10),
    CommonFont,
).mount();