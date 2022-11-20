/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-19 21:56:41
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 13:57:09
 */
import { comp, div, $, span, click, text, on } from 'alins';
import { style } from 'alins-style';
import { Edit } from '../../state/global-info';
import { Term } from '../../term';
import { isMac } from '../../utils/utils';
import { EditorStyle, TextBtn } from '../css/main-css';
import { Color } from '../css/styles/atoms';

export const Editor = comp(() => {

    const save = async () => {
        await Term.instance.disk.findFileByPath(Edit.filepath.value)
            ?.write({
                content: Edit.content.value
            });
        Edit.quitEdit();
    };
    const quit = () => {
        Edit.quitEdit();
    };

    const isCtrlS = (e: KeyboardEvent) => e.keyCode === 83 && (isMac() ? e.metaKey : e.ctrlKey);

    const onkeydown = (e: KeyboardEvent) => {
        if (!Edit.enabled.value) return;
        if (e.keyCode === 27) {
            quit();
        } else if (isCtrlS(e)) {
            save();
            e.preventDefault();
        }
    };

    window.addEventListener('keydown', onkeydown);

    // todo 编辑器优化
    const onEditorKeydown = (e: KeyboardEvent) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        }
    };

    return [
        div(style.color(() => Edit.touch.value ? Color.Success._result.color as string : '#aaa').marginBottom(10),
            $`Edit: ${Edit.filepath}`,
            $`${() => Edit.touch.value ? ' (New File)' : ''}`),
        div(
            span(TextBtn, text(`Save[${isMac() ? 'command' : 'ctrl'}+s]`), click(save)),
            span(TextBtn, text('Quit[esc]'), click(quit))
        ),
        div.model(Edit.content)(
            '#Editor[contenteditable=true][spellcheck=false]',
            EditorStyle,
            on('keydown')(onEditorKeydown),
        ),
        // textarea.model(Edit.content)
    ];
});