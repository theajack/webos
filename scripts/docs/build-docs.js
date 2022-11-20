/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-20 18:49:51
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-11-20 19:05:26
 */
const fs = require('fs');
const {resolveRootPath} = require('../build/utils');

if(!fs.existsSync(resolveRootPath('docs')))
  fs.mkdirSync(resolveRootPath('docs'))

// fs.copyFileSync(
//   resolveRootPath('packages/term/dist/webos-term.min.js'), 
//   resolveRootPath('docs/webos-term.min.js')
// );
fs.copyFileSync(
  resolveRootPath('scripts/docs/index.html'), 
  resolveRootPath('docs/index.html')
);
fs.copyFileSync(
  resolveRootPath('.gitignore'), 
  resolveRootPath('docs/.gitignore')
);