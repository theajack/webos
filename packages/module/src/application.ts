/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:48:58
 * @Description: Coding something
 */

import { Module, TModuleLoaded, TModuleProgress } from './module';

export interface IApplicationOptionsBase {
    onLoaded?: TModuleLoaded,
    iifeNameMap?: Record<string, string>;
    mainMap?: Record<string, string>;
    onDependenciesParsed?(graph: Record<string, object>): void;
    onProgress?: TModuleProgress;
    env?: Record<string, any>;
}

export interface IApplicationOptions extends IApplicationOptionsBase {
    code?: string,
}

export class Application {
    entry: Module;
    code: string;
    // 缓存 url - module 执行的结果
    ModuleExportsMap: Record<string, any> = {};
    onLoaded?: TModuleLoaded;
    onDependenciesParsed?(graph: Record<string, object>): void;

    options:IApplicationOptionsBase = {};

    constructor (options: IApplicationOptions) {
        this.options = options;

        if (options.code) {
            this.exec(options.code);
        }
    }

    async exec (code: string) {
        return new Promise((resolve) => {
            this.entry = new Module({
                app: this,
                name: code,
                type: 'code',
                onLoaded: (module) => {
                    this.onDependenciesParsed?.(
                        module.buildDependenciesGraph()
                    );
                    module.run(this.ModuleExportsMap);
                    this.onLoaded?.(module);
                    resolve(module);
                },
            });
        });
    }
}

