'use strict';
//Node.js内置的fs模块就是文件系统模块，负责读写文件。
//fs模块有同步和异步方法；
//如果同步读取文件发生错误，则需要用try...catch捕获该错误：
//如果异步读取文件发生错误，需要判断回调函数err变量；

//什么是异步方法：即类似下面的回调方法，因为JavaScript 是单线程模型；同样，nodejs也是单线程模型
/**
$.getJSON('http://example.com/ajax', function (data) {
    console.log('IO结果返回后执行...');
});
console.log('不等待IO结果直接执行后续代码...');
 */



var fs = require('fs');

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('sample.txt', 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                //console.log(data);
                resolve(data);
            }
        });
    });
}

console.debug("start reading file..")

//ES6 promise 实现异步 (ES5 之前使用callback回调方法实现异步)
//还可以使用async + await 实现同步

readFile().then(data => {
    console.log("resolve data \n", data);
}).catch(err =>{
    console.log("reject err", err);
});
console.debug("end reading file..")


//expected print:
// start reading file..
// end reading file..
// resolve data 
//  this is a sample txt file.
// hello nodejs;


// (async function(){
//     console.log("1");
//     await readFile().then(data => {
//         console.log("resolve data \n", data);
//     }).catch(err =>{
//         console.log("reject err", err);
//     });
//     // console.log("2");
//     // await readFile().then(data => {
//     //     console.log("resolve data \n", data);
//     // }).catch(err =>{
//     //     console.log("reject err", err);
//     // });
//     // console.log("3");
//     console.debug("read file end..");
// })();




// var data = 'Hello, Node.js';
// fs.writeFile('output.txt', data, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok.');
//     }
// });


//readFile

//同步读取文件需要加try ... catch 处理错误， 而上面的异步读取只能通过回调函数的error 变量判断
// try {
//     var data = fs.readFileSync('sample.txt', 'utf-8');
//     console.log(data);
// } catch (err) {
//     // 出错了
// }

//同步写文件
// var data = 'Hello, Node.js';
// fs.writeFileSync('output.txt', data);

//stream是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。
//使用流赋值文件
// var rs = fs.createReadStream('sample.txt');
// var ws = fs.createWriteStream('copied.txt');

// rs.pipe(ws);


// Buffer -> String
// var text = data.toString('utf-8');
// console.log(text);

// String -> Buffer
// var buf = Buffer.from(text, 'utf-8');
// console.log(buf);