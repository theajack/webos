<!--
 * @Author: chenzhongsheng
 * @Date: 2022-11-05 12:19:34
 * @Description: Coding something
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-23 11:32:01
-->
## 0.0.11

1. 修复babel.min.js中window指向问题
   
## 0.0.10

1. 增加执行中状态和代码队列，按照队列按顺序执行
2. 增加 onStart、onModuleExecuted、onEnd

## 0.0.9

1. 增加jsx的支持
2. 增加onError,onExecuted

## 0.0.8

修复缓存module代码不会被执行的问题

## 0.0.7

- [x] 子元素字体统一 
- [x] alins 升级到 0.0.18

## 0.0.6

1. fix babel-standalone BUG in es module
2. remove babel dependency
3. add default process into env arg
4. multi instance of Application

## 0.0.5 

1. multi instance of Term

## 0.0.4

1. Alins update 0.0.17
2. fix search command
3. fix build
4. export disk and module

## 0.0.3

1. multi instance support


## 0.0.2

- [x] [feat] 中文输入法回车优化
- [x] Fix 输出之后 删除完 hint 提示有问题
- [x] [feat] hint 触底显示优化
- [x] 3. 增加 code 命令 跳转到jsbox打开
- [x] 6. run 支持传入参数
- [x] 7. console.log 支持多个参数
- [x] 支持console.clear
- [x] 2. 时间 1月显示的是00
- [x] 1. 插件运行js报错
- [x] [bugfix] 重复切换点击input会有问题【alins问题】

## 0.0.1

feat: tab clear pwd cd clear ls [done]
feat: Path类编写 逻辑重构 修复路径相关问题 [done]
feat: 优化上下翻页到底显示空的bug [done]
feat: 单元测试 [done]
feat: command mkdir [done]
feat: command touch [done]
feat: command vim [done] 
feat: command rm [done]
feat: command cat [done] 
feat: command cp [done]
feat: command help [done]
feat: command ping [done]
feat: command find [done]
feat: command run 自定义命令 运行js文件 [done]
feat: 输入到底之后 每次输出完成之后自动划到最底部 保证输入框露出 [done]
feat: hint 提示 [done]
