/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:12:50
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 10:46:16
 */
import { comp, div, event, mounted, text } from 'alins';
import { handleCommand, initCommands } from '../command/command-handler';
import { onTab } from '../command/tab';
import { History } from './components/history';
import { InputItem } from './components/input-item';
import { pushResultError, pushResultItem } from './components/result-item';
import { CommonStyle } from './css/main-css';
import { Editor } from './components/editor';
import { Edit } from '../state/global-info';

const AppId = '#TermApp';

const Main = comp(() => {
    const onrun = async (value: string) => {
        const { commandName, success, message, result } = await handleCommand(value);
        if (success) {
            if (commandName === 'clear') return;
            if (result) {
                pushResultItem(value, typeof result === 'string' ? text(result) : result);
            } else {
                pushResultItem(value, div(
                    CommonStyle.SuccessColor,
                    text(`Execute command Success: ${value}`)
                ));
            }
        } else {
            pushResultError(value, message);
        }
    };
    return [
        comp(History),
        InputItem(event({ onrun, ontab: onTab })),
    ];
});

export function App () {

    return div(
        AppId,
        div.if(Edit.enabled)(
            Editor
        ).else(
            Main,
            mounted(() => {
                initCommands();
            })
        )
    );
}