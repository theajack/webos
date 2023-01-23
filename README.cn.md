<!--
 * @Author: tackchen
 * @Date: 2022-10-23 21:15:35
 * @Description: Coding something
-->

<p align="center">
    <img src='https://shiyix.cn/webos-icon.png' width='100px'/>
</p> 

<p align="center">
    <a href="https://www.github.com/theajack/webos/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/webos?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/webos/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/webos?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/webos-term" target="_black">
        <img src="https://img.shields.io/npm/v/webos-term?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/webos-term" target="_black">
        <img src="https://img.shields.io/npm/dm/webos-term?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/webos-term" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/webos-term/badge" alt="jsdelivr" />
    </a>
    <img src="https://visitor-badge.glitch.me/badge?page_id=theajack_webos" alt="vistor" />
</p>

<p align="center">
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/webos/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/webos?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/webos-term"><img src="https://img.shields.io/bundlephobia/minzip/webos-term.svg" alt="Size"></a>
    <a href="https://github.com/theajack/webos/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/webos.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/webos/issues"><img src="https://img.shields.io/github/issues-closed/theajack/webos.svg" alt="issue"></a>
    <a href="https://www.github.com/theajack/webos"><img src="https://img.shields.io/librariesio/dependent-repos/npm/webos-term.svg" alt="Dependent"></a>
</p>

### 🚀 [webos-term](https://github.com/theajack/webos): 基于 HTML5 FileSystem 的 Web 终端窗口

**[English](https://github.com/theajack/webos/blob/master/README.md) | [在线使用](https://theajack.github.io/webos) | [更新日志](https://github.com/theajack/webos/blob/master/scripts/version.md) | [反馈错误/缺漏](https://github.com/theajack/webos/issues/new) | [Gitee](https://gitee.com/theajack/webos) | [留言板](https://theajack.github.io/message-board/?app=webos)**

## 0 快速开始

[在线地址](https://theajack.github.io/webos)

[chrome插件下载](https://theajack.github.io/webos/extension.crx)

![](https://shiyix.cn/webos.jpg)

### 0.1 npm

使用 webos 构建你的终端窗口

```
npm i webos-term
```

```js
import { createTerm } from 'webos-term';

createTerm({
    container: 'body'
});
```

** webos-disk  文件系统操作js库 **

```
npm i webos-disk
```

具体使用请参考 [webos-disk.d.ts](https://cdn.jsdelivr.net/npm/webos-disk/dist/webos-disk.d.ts)



### 0.2 cdn

```html
<script src="https://cdn.jsdelivr.net/npm/webos-term"></script>
<script>
    Webos.createTerm({
        container: 'body'
    });
</script>
```

## 1. webos-module

在浏览器上运行 es6，支持引入 npm包

```
npm i webos-module
```

```js
import { Application } from 'webos-module';

new Application({
    code: `
        import loadsh from 'loadsh'; 
        console.log(loadsh.VERSION);
    `
});
```

umd config

```js
import { Application } from 'webos-module';

new Application({
    code: `
        import vue from 'Vue'; 
        console.log(vue);
    `,
    umdNameMap: {vue: 'Vue'}
});
```

[other useage](https://cdn.jsdelivr.net/npm/webos-module/dist/webos-module.d.ts)