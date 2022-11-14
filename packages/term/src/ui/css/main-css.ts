/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 10:44:34
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 20:07:27
 */
import { css, style } from 'alins-style';
import { CommonFont } from './styles/atoms';

export const CommonStyle = {
    FontSize: style.fontSize(16),
    SuccessColor: style.color('#4d4'),
};

css()(
    [ '::-webkit-scrollbar', style({
        width: 5,
        cursor: 'pointer',
        height: 5,
    }) ],
    [ '::-webkit-scrollbar-button, ::-webkit-scrollbar-track', style({
        display: 'none',
    }) ],
    [ '::-webkit-scrollbar-thumb', style({
        backgroundColor: 'hsla(0,0%,53.3%,.4)',
        cursor: 'pointer'
    }) ],
    [ '::-webkit-scrollbar-track-piece', style({
        backgroundColor: 'hsla(0,0%,53.3%,.06666666666666667)'
    }) ]
).mount();

css('body')(
    style.backgroundColor('#111')
        .color('#fff')
        .join(CommonStyle.FontSize)
        .margin(0).padding(15),
    CommonFont,
).mount();