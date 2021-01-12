'use strict';

const Koa = require('koa');  //注意koa 版本2.13.1 即所谓的koa2, 返回的是一个class
const app = new Koa();

const common = require("./module/common");

app.use(async (ctx, next) => {
    await next();//这里会先执行下个middleware，即先打印出 this is middleware 11.
    var data = await common.readFile();
    console.debug("send page text now.");
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});

app.use(async (ctx, next) => {
    //await next();
    // var data = await common.readFile();
    // ctx.response.type = 'text/plain';
    // ctx.response.body = data;
    console.debug("this is middleware 11.");
});

app.use(async (ctx, next) => {
    //await next();
    // var data = await common.readFile();
    // ctx.response.type = 'text/plain';
    // ctx.response.body = data;
    console.debug("this is middleware 22.");
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');