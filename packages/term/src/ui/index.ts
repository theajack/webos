/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 23:21:13
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 10:41:17
 */
import { comp } from 'alins';
import { App } from './app';
import './css/main-css';

export class UI {
    container: HTMLElement;
    constructor (container: string|HTMLElement) {
        const el = typeof container === 'string' ? document.querySelector(container) : container;

        if (!el) throw new Error('Invalid container');

        this.container = el as HTMLElement;

        comp(App).mount(this.container);
    }
}