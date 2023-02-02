/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:18:02
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-01 22:37:15
 */
import { comp, div, prop, slot, text } from 'alins';
import { style } from 'alins-style';
import { Color } from '../css/styles/atoms';
import { HistoryId } from './history';
import { HistoryInputItem } from './input-item';

const ResultItem = comp(({ slots }) => {
    return div(
        style.marginBottom(10).wordWrap('break-word'),
        slots
    );
});


export function pushResultItem (inputValue: string, resultSlots?: any) {
    comp(() => [
        HistoryInputItem(prop({ inputValue })),
        resultSlots ? ResultItem(slot(resultSlots)) : null
    ]).mount(HistoryId);
}

export function pushResultError (value: string, message: string) {
    pushResultItem(value, div(Color.Fail, text(message)));
}