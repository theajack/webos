/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:26:08
 * @Description: Coding something
 */

import { Babel } from './babel.min.js';

export function transformCode (code: string, needTransform: boolean = true): {
  code: string;
  imports: string[]
} {
    // ! 仅提取import不够 要考虑commonjs require加载 且可能不在顶层使用
    // const { ast } = Babel.transform(code, {});

    // console.warn(ast);
    // const imports: string[] = [];
    // ast.program.body.forEach((item: any) => {
    //     if (item.type === 'ImportDeclaration') {
    //         imports.push(item.source.extra.rawValue);
    //     }
    // });

    // return {
    //     code: Babel.transformFromAst(ast, '', { presets: [ 'es2015' ] }).code,
    //     imports,
    // };

    // ! 使用正则匹配妥协
    const result: string = needTransform ?
        pureTransformCode(code) :
        // (window as any).Babel.transform(code, { presets: [ 'es2015' ] }).code :
        code;
    // ! 此处还是可能会漏掉 require 加载变量作为module的情况 如 var a = 'xxx';require(a);
    const match = result.matchAll(/(?<![0-9a-zA-Z_$])require\(['"]([0-9a-zA-Z_\-\$\@\.\/]*?)['"]\)/g);
    const imports = [];
    for (const item of match) {
        imports.push(item[1]);
    }
    return {
        code: result,
        imports,
    };
}

export function pureTransformCode (code: string): string {
    return Babel.transform(code, { presets: [ 'es2015' ] }).code;
}

type TAnyFunc = (...args: any[]) => any;

export const babel = (Babel as {
    availablePlugins: any;
    availablePresets: any;
    buildExternalHelpers: TAnyFunc;
    disableScriptTags: TAnyFunc;
    registerPlugin: TAnyFunc;
    registerPlugins: TAnyFunc;
    registerPreset: TAnyFunc;
    registerPresets: TAnyFunc;
    transform: TAnyFunc;
    transformFromAst: TAnyFunc;
    transformScriptTags: TAnyFunc;
    version: string;
});