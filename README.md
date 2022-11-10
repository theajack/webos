<!--
 * @Author: tackchen
 * @Date: 2022-10-23 21:15:35
 * @Description: Coding something
-->

<p align="center">
    <img src='https://shiyix.cn/alins.png' width='100px'/>
</p> 

<p align="center">
    <a href="https://www.github.com/theajack/webos/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/webos?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/webos/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/webos?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/alins" target="_black">
        <img src="https://img.shields.io/npm/v/alins?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/alins" target="_black">
        <img src="https://img.shields.io/npm/dm/alins?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/alins" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/alins/badge" alt="jsdelivr" />
    </a>
    <img src="https://visitor-badge.glitch.me/badge?page_id=alinsjs_alins" alt="vistor" />
</p>

<p align="center">
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/webos/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/webos?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/alins"><img src="https://img.shields.io/bundlephobia/minzip/alins.svg" alt="Size"></a>
    <a href="https://github.com/theajack/webos/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/webos.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/webos/issues"><img src="https://img.shields.io/github/issues-closed/theajack/webos.svg" alt="issue"></a>
    <a href="https://www.github.com/theajack/webos"><img src="https://img.shields.io/librariesio/dependent-repos/npm/alins.svg" alt="Dependent"></a>
</p>

### 🚀 [Alins](https://github.com/theajack/webos): `Al`l-`in`-j`s` web ui Framework，No jsx/template/vdom/css/html

**[中文](https://github.com/theajack/webos/blob/master/README.cn.md) | [Docs](https://alinsjs.github.io/docs) | [Playground](https://shiyix.cn/jsbox?github=alinsjs.docs.samples/todo-list.js) | [VersionLog](https://github.com/theajack/webos/blob/master/helper/version.md) | [FeedBacl](https://github.com/theajack/webos/issues/new) | [Gitee](https://gitee.com/theajack/webos) | [MessageBoard](https://theajack.github.io/message-board/?app=alins)**

## 0 Quick Start

### 0.1 npm

```
npm i alins
```

```js
import {div} from 'alins';
div('Hello World!').mount();
```

### 0.2 cdn

```html
<script src="https://cdn.jsdelivr.net/npm/alins"></script>
<script>
  Alins.div('Hello World!').mount();
</script>
```

## 1. Features

1. No vdom, the listening data is accurately modified to dom/textNode, and the dom node is reused
2. Alins-style CSS-in-JS scheme, atomic properties/building block combinations/style response changes
3. Good componentization support
4. Support for, if, show, switch, model controller
5. Support computed and watch
6. One-way data flow + two-way binding
7. Good TS support

For more detailed functions, please refer to [Online Documentation](https://alinsjs.github.io/docs)

## 2. Samples

### 2.1. Counter [Playground](https://shiyix.cn/jsbox?github=alinsjs.docs.samples/count.js)

```js
import { button, comp, click, $, mount } from 'alins';

function Count () {
    const count = $(0);
    return button(
        click(() => {count.value++;}),
        $`Count is ${count}`
    );
}

comp(Count).mount();
```

### 2.2. Components & Model [Playground](https://shiyix.cn/jsbox?github=alinsjs.docs.samples/model.js)

```js
import {
    button, comp, prop, click, $, input, span,
} from '../alins';

export function Count () {
    const count = $(0);
    return [
        span('input count'),
        input.model(count, 'number'),
        comp(CountProps, prop({value: count})),
        button('add', click(() => {count.value++;})),
    ];
};

export function CountProps ({props}) {
    return span($`Count is ${props.value}`);
}

comp(Count).mount();
```

## 3. todolist [Playground](https://shiyix.cn/jsbox?github=alinsjs.docs.samples/todo-list.js)

```js
import {comp, button, div, input, click, $} from '../alins';
import {style} from '../alins-style';


export function todoList () {
    const edit = $('');
    const list = $([]);
    const addItem = () => {
        list.push({content: edit.value, done: false});
        edit.value = '';
    };
    const removeItem = (index) => { list.splice(index.value, 1); };
    const finishItem = (item) => { item.done = !item.done.value; };

    const itemStyle = (item) => {
        return style.textDecoration(() => item.done.value ? 'line-through' : 'none')
            .color(() => item.done.value ? '#888' : '#222');
    }

    return [
        input.model(edit),
        button('submit', click(addItem)),
        div('.todo-list',
            div.for(list)((item, index) => [
                itemStyle(item),
                $`${() => index.value + 1}:${item.content}`,
                button('delete', click(removeItem).args(index)),
                button(
                    $`${() => item.done.value ? 'undo' : 'done'}`,
                    click(finishItem).args(item)
                ),
            ]),
        ),
    ];
}
comp(todoList).mount();
```

## 4. css in js [Playground](https://shiyix.cn/jsbox?github=alinsjs.docs.samples/style.js)

```js
import {
    div, $ , button, hover, click, input, cls
} from 'alins';
import {css, style} from '../alins-style';

function Style () {
    const num = $(30);
    const active = $(false);

    css('.main')(
        style({
            color: '#888',
            marginLeft: $`${num}px`,
        }),
        ['&.active', style.fontSize(num)],
        ['.child', style.marginTop(num)]
    ).mount();

    return div(`parent.main`,
        cls({active}),
        hover('color: #f44'),
        input.model(num, 'number'),
        button('toggle active', click(() => active.value = !active.value)),
        div('child.child'),
    );
}

comp(Style).mount();
```
