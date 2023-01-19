/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:48:58
 * @Description: Coding something
 */

import { Module, TModuleLoaded } from './module';

export class Application {

    entry: Module;

    constructor ({
        code,
        onloaded,
        umdNameMap = {},
    }: {
        code: string,
        onloaded: TModuleLoaded,
        umdNameMap?: Record<string, string>
    }) {
        Module.UMDNameMap = umdNameMap;
        this.entry = new Module({
            name: code,
            type: 'code',
            onloaded: (module) => {
                module.run();
                onloaded(module);
            },
        });
    }

}