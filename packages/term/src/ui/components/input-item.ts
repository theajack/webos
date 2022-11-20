/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:17:58
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 16:34:35
 */
import { $, div, IComponentOptions, input, span, on, mounted, click, comp, text } from 'alins';
import { style } from 'alins-style';
import { onHint } from '../../command/hint';
import { currentDirName, Hint, inputContent, userName } from '../../state/global-info';
import { Storage } from '../../utils/storage';
import { CommonStyle } from '../css/main-css';
import { CommonFont } from '../css/styles/atoms';

const ContentHistory = (() => {
    const maxLen = 100;
    const key = 'history';

    const history = Storage.read(key);
    const contentHistory: string[] = history || [];

    let index = contentHistory.length;

    let editHistory: string[] = [];
    editHistory[index] = '';

    return {
        get () {
            const editValue = editHistory[index];
            return typeof editValue == 'string' ? editValue : contentHistory[index];
        },
        prev () {
            if (index > 0) index --;
            return this.get();
        },
        next () {
            const nexti = index + 1;
            if (nexti < contentHistory.length || nexti < editHistory.length) {
                index ++;
            }
            return this.get();
        },
        push (v: string) {
            contentHistory.push(v);
            if (contentHistory.length > maxLen) {
                contentHistory.shift();
            }
            index = contentHistory.length;
            editHistory = [];
            editHistory[index] = '';
            Storage.write(key, contentHistory);
        },
        oninput (v: string) {
            editHistory[index] = v;
        }
    };
})();

export const InputItem = comp(({ events }: IComponentOptions) => {

    const inputStyle = style.flex(1)
        .outline('none')
        .backgroundColor('transparent')
        .color('#fff')
        .border('none')
        .join(CommonStyle.FontSize)
        .padding(0);

    const onkeyup = (e: KeyboardEvent, dom: HTMLInputElement) => {
        // console.log(e);
        const code = e.keyCode;
        const value = dom.value;
        switch (code) {
            case 9: events.ontab(value); break;
            // case 38:
            // case 40:{
            //     const value = ContentHistory[code === 38 ? 'prev' : 'next']();
            //     // console.log('value', value);
            //     if (typeof value == 'string') inputContent.value = value;
            // };break;
            case 13: {
                if (value) {
                    ContentHistory.push(value);
                    inputContent.value = '';
                    events.onrun(value);
                }
                setTimeout(ensureInputIsVisible);
                e.preventDefault();
                Hint.hideHint();
            };break;
            default: ContentHistory.oninput(value); break;
        }
        onHint(dom.value);
    };

    const onkeydown = (e: KeyboardEvent) => {
        const code = e.keyCode;
        if ([ 9, 13, 38, 40 ].includes(code)) {
            if (code === 38 || code === 40) {
                const name = code === 38 ? 'prev' : 'next';
                const value = ContentHistory[name]();
                if (typeof value == 'string') inputContent.value = value;
            }
            e.preventDefault();
        }
    };

    return div(
        div(
            style.display('flex'),
            span(
                '#InputTitle',
                text($`webos:${currentDirName} ${userName}$`),
                style.marginRight(10),
                click.stop
            ),
            input.model(inputContent)(
                '#InputInput[spellcheck=false]',
                inputStyle, CommonFont,
                on('keyup')(onkeyup),
                on('keydown')(onkeydown),
                on('blur')(() => {Hint.hideHint();}),
                on('focus')((e, dom) => {onHint(dom?.value);}),
                mounted((dom) => {
                    window.addEventListener('click', () => {dom.focus();});
                })
            ),
        ),
        div.show(Hint.enabled)(
            style.color('#777').marginTop(5),
            span.show(() => !!Hint.text.value)(text($`Hint: ${Hint.text}`)),
            div(
                span.for(Hint.list)(item => [
                    style.marginRight(20),
                    text(item)
                ])
            )
        ),
    );
});

export const HistoryInputItem = comp(({ props }) => {
    return div(
        '.InputTitle',
        style.marginBottom(3),
        text(`webos:${currentDirName.value} ${userName.value}$ ${props.inputValue.value}`),
    );
});

function ensureInputIsVisible () {
    document.documentElement.scrollTop = document.documentElement.offsetHeight;
}