// 导入 header.js 文件暴露 出来的东西

// import headerModules from './header.js' 
// console.log(headerModules);

// 导入 footer.js 文件暴露 出来的东西
// import { c } from "./footer.js"
// import { a, b , c } from "./footer.js"
// console.log(a, b, c);

// 导入utils文件的内容 导入语法1
// import fn from "./utils.js"
// fn()
// console.log(fn);
// 导入utils文件的内容 导入语法2 
// import { text , age } from "./utils.js"
// console.log(text, age);

// 导入语法1 导入语法2合用
// import fn, {text, age} from './utils.js'
// console.log(fn, text, age);

// 导入constants.js的内容
// import modules from "./constants.js"
// console.log(modules);

import * as constants from "./constants.js"
// console.log(a,b, c,d); 
console.log(constants);
console.log(constants.i);