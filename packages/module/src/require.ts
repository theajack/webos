/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-17 08:26:08
 * @Description: Coding something
 */

import { Module } from './module';
import Babel from 'babel-standalone';

const ModuleMap: Record<string, Module> = {

};

function getModule (name: string): Module {
    let module = ModuleMap[name];
    if (!module) {
        module = new Module(name);
        ModuleMap[name] = module;
    }
    return module;
}

export function transformCode (code: string): {
  code: string;
  imports: string[]
} {
    const { ast } = Babel.transform(code, {});

    const imports: string[] = [];
    ast.program.body.forEach((item: any) => {
        if (item.type === 'ImportDeclaration') {
            imports.push(item.source.extra.rawValue);
        }
    });

    return {
        code: Babel.transformFromAst(ast, '', { presets: [ 'es2015' ] }).code,
        imports,
    };


}


export function require (name: string, parent: string) {
    const module = getModule(name);
}

export function entry (code: string) {
}

// 抽象语法树 找到所有依赖 Promise.all 加载好
// Babel 转换
