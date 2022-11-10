/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-09 23:21:13
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-09 23:23:32
 */
export class UI {
    container: Element;
    constructor (container: string|HTMLElement) {
        const el = typeof container === 'string' ? document.querySelector(container) : container;

        if (!el) throw new Error('Invalid container');

        this.container = el;
    }
}