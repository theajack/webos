/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:26:08
 * @Description: Coding something
 */

import Babel from 'babel-standalone';
import { Module } from './module';


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
    // todo 优化一下 使用按需 transform 大部分npm包不需要 transform
    console.log(needTransform);
    const result: string = needTransform ?
        Babel.transform(code, { presets: [ 'es2015' ] }).code :
        code;
    // 此处还是可能会漏掉 require 加载变量作为module的情况 如 var a = 'xxx';require(a);
    const match = result.matchAll(/(?<![0-9a-zA-Z_$])require\(['"](.*?)['"]\)/g);
    const imports = [];
    for (const item of match) {
        imports.push(item[1]);
    }
    return {
        code: result,
        imports,
    };
}


export function requireModule (name: string, parent: Module) {
    const module = parent.dependencies[name];
    if (!module) throw new Error(`Module ${name} not found`);
    return module.run();
}

export function execSingleModule () {

}

// 抽象语法树 找到所有依赖 Promise.all 加载好
// Babel 转换
