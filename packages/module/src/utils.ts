/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:19:08
 * @Description: Coding something
 */
import { Path } from 'webos-path';
import 'whatwg-fetch';

export async function fetchCode (url: string) {
    let text = await fetchText(url);
    if (!text) {
        let entry = 'index.js';
        if (isNpmRoot(url)) {
            const result = await fetchJson(`${url}/package.json`);
            if (result.main) entry = result.main;
            if (!entry.endsWith('.js')) entry += '/index.js';
        }
        text = await fetchText(Path.join(url, entry));
        // https://cdn.jsdelivr.net/npm/has/src
        // https://cdn.jsdelivr.net/npm/for-each/index
    }
    return text;
}

export async function fetchText (url: string) {
    const data = await fetch(url);
    return (data.ok) ? await data.text() : '';
}
export async function fetchJson (url: string) {
    const data = await fetch(url);
    return (data.ok) ? await data.json() : null;
}

export function isNpmRoot (url: string) {
    return /^https:\/\/cdn\.jsdelivr\.net\/npm\/[a-z\-]+\/?$/.test(url);
}

