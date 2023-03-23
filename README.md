<!--
 * @Author: tackchen
 * @Date: 2022-10-23 21:15:35
 * @Description: Coding something
-->

<p align="center">
    <img src='https://shiyix.cn/images/webos-icon.png' width='100px'/>
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

### 🚀 [webos-term](https://github.com/theajack/webos): HTML5 FileSystem-based web terminal window

**[中文](https://github.com/theajack/webos/blob/master/README.cn.md) | [Use Online](https://theajack.github.io/webos) | [Changelog](https://github.com/theajack/webos/blob/master/scripts/version.md) | [Feedback Errors/Missing Points](https://github.com/theajack/webos/issues/new) | [Gitee](https://gitee.com/theajack/webos) | [Message Board](https://theajack.github.io/message-board/?app=webos)**

## 0 Quick start

[Online Address](https://theajack.github.io/webos)

[Chrome Extension](https://theajack.github.io/webos/extension.crx)

![](https://shiyix.cn/webos.jpg)

### 0.1 npm

Use WebOS to build your terminal window

```
npm i webos-term
```

```js
import { createTerm } from 'webos-term';

createTerm({
    container: 'body'
});
```

** WebOS-Disk File System Operations JS Library **

```
npm i webos-disk
```

For details, please refer to [webos-disk.d.ts](https://cdn.jsdelivr.net/npm/webos-disk/dist/webos-disk.d.ts)

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

Run es6 in Broswer, support use npm packages

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
    iifeNameMap: {vue: 'Vue'}
});
```

[other useage](https://cdn.jsdelivr.net/npm/webos-module/dist/webos-module.d.ts)