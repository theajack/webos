/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-21 00:09:58
 * @Description: Coding something
 */
import { Path } from 'webos-path';
import { fetchJson, fetchText, isNpmRoot } from './utils';

export class NPMLoader {
    parentUrl: string = '';
    name: string = '';
    url: string = '';

    constructor (parentUrl: string, name: string) {
        this.parentUrl = parentUrl;
        this.name = name;

        let url = '';

        if (name.startsWith('./') || name.startsWith('../')) {
            // xxx/xx.js ./
            if (parentUrl.endsWith('.js') && name.startsWith('./')) {
                name = name.replace('./', '../');
            }
            url = Path.join(parentUrl, name);
            if (!this.isNpmRoot(url)) {
                if (!url.endsWith('.js')) url = `${url}.js`;
            }
        } else {
            // 针对直接 'aa/bb' 的情况
            if (name.includes('/') && !name.endsWith('.js')) name = `${name}.js`;
            url = `https://cdn.jsdelivr.net/npm/${name}`;
        }
        if (url[url.length - 1] === '/')
            url = url.substring(0, url.length - 1);
        this.url = url;
    }

    async fetch (): Promise<string> {


        let text = await fetchText(this.url);

        if (text) return text;

        if (!this.isNpmRoot()) return '';

        const main = (await fetchJson(`${this.url}/package.json`)).main;

        if (!main) return '';

        if (main.endsWith('.js')) {
            return await fetchText(Path.join(this.url, main));
        }

        text = await fetchText(Path.join(this.url, `${main}.js`));

        if (text) return text;

        return await fetchText(Path.join(this.url, `${main}/index.js`));
    }


    isNpmRoot (url = this.url) {
        return isNpmRoot(url);
    }

    fromNpm () {
        return this.url.startsWith('https://cdn.jsdelivr.net/npm/');
    }
}