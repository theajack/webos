/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:48:58
 * @Description: Coding something
 */

import { Module, TModuleErrorType, TModuleExecuted, TModuleLoaded, TModuleProgress } from './module';

export interface IErrorOptions {
    module: Module;
    error: any;
    type: TModuleErrorType;
}

export interface IApplicationOptionsBase {
    onLoaded?: TModuleLoaded,
    iifeNameMap?: Record<string, string>;
    mainMap?: Record<string, string>;
    onDependenciesParsed?(graph: Record<string, object>): void;
    onProgress?: TModuleProgress;
    env?: Record<string, any>;
    onError?: (options: IErrorOptions)=>void;
    onModuleExecuted?: TModuleExecuted;
    onExecuted?: ()=>void;
}

export interface IApplicationOptions extends IApplicationOptionsBase {
    code?: string,
}

export class Application {
    entry: Module;
    code: string;
    // 缓存 url - module 执行的结果
    ModuleExportsMap: Record<string, any> = {};
    onDependenciesParsed?(graph: Record<string, object>): void;

    options:IApplicationOptionsBase = {};

    constructor (options: IApplicationOptions = {}) {

        if (!options.env) {options.env = {};}

        const defaultProcess = { env: { NODE_ENV: 'production', OS: 'webos' }, argv: [] };

        if (!options.env.process) { options.env.process = defaultProcess;}
        else {Object.assign(options.env.process, defaultProcess);}

        this.options = options;

        if (options.code) {
            this.exec(options.code);
        }
    }

    async exec (code: string) {
        this.code = code;
        // ! 重新运行时需要清空map
        this.ModuleExportsMap = {};
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
                    this.options.onLoaded?.(module);
                    resolve(module);
                },
                onExecuted: () => {
                    this.options.onExecuted?.();
                }
            });
        });
    }
}

