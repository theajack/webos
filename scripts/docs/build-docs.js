/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-20 18:49:51
 * @Description: Coding something
 * @LastEditors: chenzhongsheng
 * @LastEditTime: 2022-12-02 21:01:56
 */
const fs = require('fs');
const {resolveRootPath, traverseDir} = require('../build/utils');

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
fs.copyFileSync(
  resolveRootPath('extension/extension.crx'), 
  resolveRootPath('docs/extension.crx')
);


if(!fs.existsSync(resolveRootPath('commands')))
  fs.mkdirSync(resolveRootPath('commands'))


traverseDir(resolveRootPath('scripts/dev/commands'), (name)=>{
  if(name.indexOf('.js') === -1) return;
  fs.copyFileSync(
    resolveRootPath(`scripts/dev/commands/${name}`), 
    resolveRootPath(`commands/${name}`)
  );
})