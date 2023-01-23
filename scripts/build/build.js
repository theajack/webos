/*
 * @Author: tackchen
 * @Date: 2022-10-23 20:12:31
 * @Description: Coding something
 */

const execa = require('execa');
const { resolveRootPath } = require('./utils');
const fs = require('fs');

const dirName = process.argv[2];

console.log(`dirName=${dirName}`);

async function build () {
    await execa(
        resolveRootPath('node_modules/rollup/dist/bin/rollup'),
        [
            '-c',
            resolveRootPath('scripts/build/rollup.config.js'),
            '--environment',
            [
                `PACKAGE_NAME:${dirName}`,
            ],
        ],
        { stdio: 'inherit' },
    );
}

async function main () {
    await build();

    // ! 下面的逻辑放在 scripts 后面的步骤里做 否则会build失败
    // initSinglePackageInfo(dirName, false);

    if (dirName === 'term') {
        let code = fixBabelStandAloneImport('/packages/term/dist/webos-term.min.js');
        // 放到 extension 目录下
        code += 'Webos.createTerm({container: "body"});';
        fs.writeFileSync(resolveRootPath('/extension/js/webos-term.min.js'), code, 'utf-8');
    } else if (dirName === 'module') {
        fixBabelStandAloneImport('/packages/module/dist/webos-module.min.js');
    }
}

// fix babel-standalone 引入打包的bug
function fixBabelStandAloneImport (filePath) {
    const dist = resolveRootPath(filePath);
    let code = fs.readFileSync(dist, 'utf-8');
    code = code.replaceAll('function(){return this}()', 'function(){return this||window}()');
    fs.writeFileSync(dist, code, 'utf-8');
    return code;
}

main();


