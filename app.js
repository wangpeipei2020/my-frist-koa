'use strict';

// 引入hello模块:
//node模块的定义：文件模块，内置模块，全局模块，第3方模块
// node 如何查找（加载）模块？

//理解模块循环依赖？即module_a 依赖 module_b, module_b 同时也依赖了module_a; 
//循环依赖要重点要明白：require 引用模块是同步执行的；

//node 中每个.js 文件都可以作为一个模块，模块具有文件作用域，即2个模块可以定义相同名称的变量和方法而互不影响；
//node 中有内置模块，如http, fs, path 等；
//文件模块，以相等路径引入的模块，如 require("./module_a");
//第3方模块，如require("log4js"); 此类模块在导入时候会参照package.json 文件的main 参数定义，如果没有找到，会使用默认文件名称（index.js...）再次查找

//在使用require()引入文件模块的时候，请注意模块的相对路径 ./; 如果没有相对路径，则Node会依次在内置模块、全局模块和当前模块下查找hello.js
//模块内部的变量名称和函数名称不冲突；即2个模块可以有相同的名字的变量；

var greet = require('./module/hello'); //node中模块首次加载后会缓存，第2次以后加载会直接从缓存得到模块；
var greet = require('./module/hello'); 

const s = 'Michael';

//console.log("module", module);
greet(s); // Hello, Michael!


/**  验证module.exports  在nodejs交互模式下可以查看module对象
 * Module {
  id: '<repl>',
  path: '.',
  exports: {},
  parent: undefined,
  filename: null,
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\wangpeipei\\repl\\node_modules',
    'C:\\Users\\wangpeipei\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules',
    'C:\\Users\\wangpeipei\\.node_modules',
    'C:\\Users\\wangpeipei\\.node_libraries',
    'C:\\Program Files\\nodejs\\lib\\node'
  ]
}

let _module = { _exports:{} };   //_exports  ==== _module._exports  这里可以看出，_exports其实就是_module._exports 的简写而已

function fn(_exports){
//_exports = {"name":"peipei"};
_exports.name = "peipei";
return _exports;
}

let re = fn(_module._exports);

console.log("re", re);
console.log("_module._exports", _module._exports);
 */