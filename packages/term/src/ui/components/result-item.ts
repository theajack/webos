/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:18:02
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 18:10:09
 */
import { comp, div, IComponentOptions, prop, slot } from 'alins';
import { style } from 'alins-style';
import { HistoryId } from './history';
import { HistoryInputItem } from './input-item';

export function ResultItem ({ slots }: IComponentOptions) {
    return div(
        style.marginBottom(5),
        slots
    );
}


export function pushResultItem (inputValue: string, resultSlots: any) {
    comp(() => [
        comp(HistoryInputItem, prop({ inputValue })),
        comp(ResultItem, slot(resultSlots))
    ]).mount(HistoryId);
}