'use strict';

//该文件代码 验证了使用express + promise 可以实现异步代码功能；
//即express 和 koa 一样也支持了 es6 promise + await 实现异步方法
//由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入。

const express = require('express'); //express封装了http内置模块
const app = express();
const common = require("./module/common");

app.get('/', function (req, res) {
    res.send('Hello World!');
});

//异步读取文件
app.get('/readfile', async function (req, res) {
    // fs.readFile('/file1', function (err, data) {
    //     if (err) {
    //         res.status(500).send('read file1 error');
    //     }
    //     fs.readFile('/file2', function (err, data) {
    //         if (err) {
    //             res.status(500).send('read file2 error');
    //         }
    //         res.type('text/plain');
    //         res.send(data);
    //     });
    // });


        console.log("start reading file content...");

        //可以使用await 同步读取文件
        //let file =  await common.readFile();

        //也可以使用下面的then catch 实现异步读取文件
        common.readFile().then(file => {
            res.type('text/plain');
            res.status(200).send(file);
        }).catch(err => {
            throw err;
        }).finally(()=>{
            console.log("execute finally block;");
        });

        console.log("end reading file");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});