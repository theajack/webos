/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-13 08:38:10
 * @Description: Coding something
 */

import Babel from 'babel-standalone';
import { transformCode } from './require';

console.log(Babel);


export const babel = Babel;

// node-polyfill-webpack-plugin

const opt = { presets: [ 'es2015' ] };
// if (new RegExp(`<script(.|${syb.reg})*? react(>|([ ${syb.reg}=]+.*?>))`, 'i').test(item)) {
//     // if (/<script(.|\r\n)*? react(>|([ \r\n=]+.*?>))/.test(item)) {
//     opt.presets.push('react');
// }

(window.babel = babel);

const code =
/* javascript*/`
import {aa} from 'AA';
import bb from "bbB";
import {aaa} from './AA';
const a=1;
class A{

}
export const b = ()=>{return require("xx")};
export default a;
`;

const result = Babel.transform(code, opt);

console.log(result);

const _js = result.code;


// ! =>


console.log(transformCode(code));

/* javascript*/`



const exports = {};
const require = (name)=>{

}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b = undefined;

var _AA = require('AA');

var _bb = require('bb');

var _bb2 = _interopRequireDefault(_bb);

var _AA2 = require('./AA');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 1;

var A = function A() {
  _classCallCheck(this, A);
};

var b = exports.b = function b() {
  return _AA.aa + _bb2.default;
};
exports.default = a;
`;

console.log(_js);