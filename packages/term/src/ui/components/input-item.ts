/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:17:58
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 20:57:50
 */
import { $, div, IComponentOptions, input, span, on, mounted, click } from 'alins';
import { style } from 'alins-style';
import { currentDirName, userName } from 'src/state/global-info';
import { Storage } from 'src/utils/storage';
import { CommonStyle } from '../css/main-css';
import { CommonFont } from '../css/styles/atoms';

const ContentHistory = (() => {
    const maxLen = 100;
    const key = 'history';

    const history = Storage.read(key);
    const contentHistory: string[] = history || [];

    let index = contentHistory.length;

    let editHistory: string[] = [];

    return {
        get () {
            return editHistory[index] || contentHistory[index];
        },
        prev () {
            if (index > 0) index --;
            return this.get();
        },
        next () {
            const nexti = index + 1;
            if (nexti < contentHistory.length || nexti < editHistory.length) index ++;
            return this.get();
        },
        push (v: string) {
            contentHistory.push(v);
            if (contentHistory.length > maxLen) {
                contentHistory.shift();
            }
            index = contentHistory.length;
            editHistory = [];
            Storage.write(key, contentHistory);
        },
        oninput (v: string) {
            editHistory[index] = v;
        }
    };
})();

export function InputItem ({ events }: IComponentOptions) {

    const content = $('');

    const inputStyle = style.flex(1)
        .outline('none')
        .backgroundColor('transparent')
        .color('#fff')
        .border('none')
        .fontSize(CommonStyle.FontSize)
        .padding(0);

    const onkeyup = (e: KeyboardEvent, dom: HTMLInputElement) => {
        console.log(e);
        const code = e.keyCode;
        const value = dom.value;
        switch (code) {
            case 9: events.ontab(value); break;
            case 38:
            case 40:{
                const value = ContentHistory[code === 38 ? 'prev' : 'next']();
                if (value) content.value = value;
            };break;
            case 13: {
                if (value) {
                    ContentHistory.push(value);
                    content.value = '';
                    events.onrun(value);
                }
                e.preventDefault();
            };break;
            default: ContentHistory.oninput(value); break;
        }
    };

    const onkeydown = (e: KeyboardEvent) => {
        if ([ 9, 13, 38, 40 ].includes(e.keyCode)) e.preventDefault();
    };

    return div(
        style.display('flex'),
        span(
            $`#InputTitle:webos:${currentDirName} ${userName}$`,
            style.marginRight(10),
            click(() => {}, 'stop')
        ),
        input.model(content)(
            '#InputInput[spellcheck=false]',
            inputStyle, CommonFont,
            on('keyup')(onkeyup),
            // on('keypress')(onkeyup), // todo keypress 只有字符键触发，可以通过up down事件模拟 实现连续翻记录
            on('keydown')(onkeydown),
            mounted((dom) => {
                window.addEventListener('click', () => {dom.focus();});
            })
        )
    );
}

export function HistoryInputItem ({ props }: IComponentOptions) {
    return div(
        // todo 处理字符冲突问题
        `#InputTitle:webos:${currentDirName.value.replace(/\//g, '|')} ${userName.value}$ ${props.inputValue.value}`,
    );
}