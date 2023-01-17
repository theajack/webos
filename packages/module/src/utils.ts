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
        return '';
    }
}