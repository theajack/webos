/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-10 16:32:05
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 15:38:02
 */
import { $, value } from 'alins';
import { focusToEnd } from '../utils/utils';

export const userName = $('admin');

export const currentDirName = $('');

export const inputContent = $('');

export const Hint = (() => {
    const state = $({
        text: '',
        list: [],
        enabled: false,
    });
    return {
        get text () {return state.text;},
        get enabled () {return state.enabled;},
        get list () {return state.list;},
        setHint (v: string, list: string[]) {
            state.text = v;
            state.enabled = true;
            state.list[value] = list;
        },
        hideHint () {
            state.enabled = false;
        }
    };
})();

export const Edit = (() => {
    const state = $({
        enabled: false,
        content: '',
        filepath: '',
        touch: false, // 是否是新建文件
    });


    return {
        get enabled () {
            return state.enabled;
        },
        get content () {
            return state.content;
        },

        get filepath () {
            return state.filepath;
        },
        get touch () {
            return state.touch;
        },

        enterEdit (path: string, content: string, touch = false) {
            state.content = content;
            state.filepath = path;
            state.enabled = true;
            state.touch = touch;

            focusToEnd(document.querySelector('#Editor'));
        },
        quitEdit () {
            state.content = '';
            state.enabled = false;

            (document.querySelector('#InputInput') as any)?.focus();
        }
    };
})();

// export const Edit = $({
//     enabled: false,
//     content: '',
//     filepath: ''
// });