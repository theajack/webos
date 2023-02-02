/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 23:21:13
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-01 22:45:27
 */
import { comp } from 'alins';
import { App } from './app';
import { initContainerStyle } from './css/main-css';

export class UI {
    container: HTMLElement;
    constructor (container: string|HTMLElement) {
        const el = typeof container === 'string' ? document.querySelector(container) : container;
        if (!el) throw new Error('Invalid container');

        initContainerStyle(container);
        this.container = el as HTMLElement;
        comp(App).mount(this.container);
    }
}