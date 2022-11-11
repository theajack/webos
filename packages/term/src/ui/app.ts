/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:12:50
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-10 19:53:30
 */
import { comp, div, event, mounted } from 'alins';
import { style } from 'alins-style';
import { handleCommand, initCommands } from 'src/command/command-handler';
import { History } from './components/history';
import { InputItem } from './components/input-item';
import { pushResultItem } from './components/result-item';

const AppId = '#TermApp';

export function App () {

    const onrun = async (value: string) => {
        const result = await handleCommand(value);
        if (result.success) {
            if (result.name === 'clear') return;
            if (result.result) {
                pushResultItem(value, result.result);
            } else {
                pushResultItem(value, div(`Result = value=${value}`));
            }
        } else {
            pushResultItem(value, comp(() => div(style.color('#f00'), result.message)));
        }
    };
    const ontab = (value: string) => {
        console.warn('tab', value);
    };

    return div(
        AppId,
        comp(History),
        comp(InputItem, event({ onrun, ontab })),
        mounted(() => {
            initCommands();
        })
    );
}