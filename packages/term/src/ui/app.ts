/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:12:50
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-23 09:21:28
 */
import { comp, div, event, text } from 'alins';
import { handleCommand } from '../command/command-handler';
import { onTab } from '../command/tab';
import { History } from './components/history';
import { InputItem } from './components/input-item';
import { pushResultError, pushResultItem } from './components/result-item';
import { CommonStyle } from './css/main-css';
import { Editor } from './components/editor';
import { Edit } from '../state/global-info';

const AppId = '#TermApp';

function pushDefaultResult (value: string) {
    pushResultItem(value, div(
        CommonStyle.SuccessColor,
        text(`Execute command Success: ${value}`)
    ));
}

const Main = comp(() => {
    const onrun = async (value: string) => {
        const commandReturn = await handleCommand(value);
        if (!commandReturn) {
            pushDefaultResult(value);
            return;
        }
        const { commandName, success, message, result } = commandReturn;
        if (success) {
            if (commandName === 'clear') return;
            if (result) {
                pushResultItem(value, typeof result === 'string' ? text(result) : result);
            } else {
                pushDefaultResult(value);
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
        )
    );
}