/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:19:08
 * @Description: Coding something
 */
import 'whatwg-fetch';

export async function fetchCode (url: string) {
    const data = await fetch(url);


    if (data.ok) {
        return await data.text();
    } else {
        if (data.status === 404) { // "main": "./src", 处理这种情况的重试
            const result = await fetch(`${url}/package.json`);
            if (result.ok) {
                const main = await data.json();
                './src', 'index';
                // https://cdn.jsdelivr.net/npm/has/src
                // https://cdn.jsdelivr.net/npm/for-each/index
                debugger;
            } else {
                return '';
            }
        }
        debugger;
        return '';
    }


}

