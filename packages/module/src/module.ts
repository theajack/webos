
/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:16:47
 * @Description: Coding something
 */
import { Path } from 'webos-path';
import { requireModule, transformCode } from './require';
import { fetchCode } from './utils';

// 缓存 url - Module
const ModuleMap: Record<string, Module> = {};

// 缓存 url - module 执行的结果
const ModuleRunMap: Record<string, any> = {};

type TModuleType = 'name' | 'code' | 'url';

export type TModuleLoaded = (module: Module) => void;

export class Module {

    static UMDNameMap: Record<string, any> = {};

    name: string = '';
    type: TModuleType;
    parent: Module | null;
    onloaded: TModuleLoaded;
    url = '';

    code: string = '';
    imports: string[] = [];
    dependencies: Record<string, Module> = {};

    exports: any = null;
    fromNpm: boolean = false;

    constructor ({
        name,
        parent = null,
        onloaded,
        type = 'name'
    }: {
        name: string,
        parent?: Module | null,
        onloaded: TModuleLoaded,
        type?: TModuleType,
    }) {
        this.type = type;
        this.onloaded = onloaded;
        this.parent = parent;

        if (parent === null || type === 'code') {
            this.name = 'CODE';
            this.onCode(name);
        } else {
            this.name = name;
            if (type === 'name') {
                if (name.startsWith('./') || name.startsWith('../')) {
                    if (name.endsWith('/')) debugger;
                    if (!name.endsWith('.js')) name = `${name}.js`;
                    this.url = Path.join(parent.url, name);
                } else {
                    if (name.includes('/') && !name.endsWith('.js')) name = `${name}.js`;
                    this.url = `https://cdn.jsdelivr.net/npm/${name}`;
                }
                this.fromNpm = this.url.startsWith('https://cdn.jsdelivr.net/npm/');
                if (this.url.includes('for-each')) debugger;
            } else {
                this.url = name;
            }
            if (ModuleMap[this.url]) return ModuleMap[this.url];
            this.loadCode();
            ModuleMap[this.url] = this;
        }

    }

    async loadCode () {
        try {
            const code = await fetchCode(this.url);
            this.onCode(code);
        } catch (e) {
            throw new Error(`模块加载失败：${this.name}`);
        }
    }

    onCode (originCode: string) {
        const { code, imports } = transformCode(originCode, !this.fromNpm);

        // if (imports.length > 0) debugger;

        if (imports.includes('call-bind')) debugger;

        this.code = code;
        this.imports = imports;

        if (imports.length === 0) {
            this.onloaded(this);
            return;
        }

        let loadedNum = 0;
        const onloaded = (name: string, module: Module) => {
            loadedNum ++;
            this.dependencies[name] = module;
            if (loadedNum >= imports.length) {
                this.onloaded(this);
            }
        };

        for (const name of imports) {
            this.dependencies[name] = new Module({
                name,
                parent: this,
                onloaded: (module) => {
                    onloaded(name, module);
                },
                type: this.checkType(name)
            });
        }
    }

    checkType (name: string) {
        if (name.startsWith('https://') || name.startsWith('http://')) return 'url';
        return 'name';
    }

    run () {
        if (!ModuleRunMap[this.url]) {
            const exports = {};
            const module = { exports };
            const require = (name: string) => {
                return requireModule(name, this);
            };
            let returnCode = 'return exports;';
            const umd = Module.UMDNameMap[this.name];
            if (umd) returnCode = ` window.${umd}=${umd}; return ${umd};`;

            ModuleRunMap[this.url] = new Function(
                'require', 'exports', 'module',
                `return (function(require, exports, module){${this.code}; ${returnCode}})(require, exports, module);`
            )(require, exports, module);
        }
        this.exports = ModuleRunMap[this.url];
        return this.exports;
    }
}
