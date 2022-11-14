/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:18:02
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 20:04:54
 */
import { comp, div, prop, slot, text } from 'alins';
import { style } from 'alins-style';
import { HistoryId } from './history';
import { HistoryInputItem } from './input-item';

const ResultItem = comp(({ slots }) => {
    return div(
        style.marginBottom(10),
        slots
    );
});


export function pushResultItem (inputValue: string, resultSlots: any) {
    comp(() => [
        HistoryInputItem(prop({ inputValue })),
        ResultItem(slot(resultSlots))
    ]).mount(HistoryId);
}

export function pushResultError (value: string, message: string) {
    pushResultItem(value, div(style.color('#f00'), text(message)));
}