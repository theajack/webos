/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:12:50
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-12 19:59:33
 */
import { comp, div, event, mounted, text } from 'alins';
import { style } from 'alins-style';
import { handleCommand, initCommands } from 'src/command/command-handler';
import { onTab } from 'src/command/tab';
import { History } from './components/history';
import { InputItem } from './components/input-item';
import { pushResultError, pushResultItem } from './components/result-item';
import { CommonStyle } from './css/main-css';

const AppId = '#TermApp';

export function App () {

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
    return div(
        AppId,
        comp(History),
        InputItem(event({ onrun, ontab: onTab })),
        mounted(() => {
            initCommands();
        })
    );
}