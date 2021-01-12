'use strict';

const Koa = require('koa');  //注意koa 版本2.13.1 返回的是class
const app = new Koa();
// 注意require('koa-router')返回的是函数:
//const router = require('koa-router')();
//var fs = require('fs');
//const url = require('url');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//koa 里面的app.use 中间件的执行顺序还是同步执行的；测试中间件是先定义的先执行，而且是同步执行
var myLogger = function (ctx, next) {
    setTimeout(() => {
      console.debug("myLogger middleware!");
      console.debug('LOGGED')  //Every time the app receives a request, it prints the message “LOGGED” to the terminal.
      //next();
    }, 1000);
    next();
  }
  app.use(myLogger);
  
  var requestTime = function (ctx, next) {
    //req.requestTime = Date.now();
    console.debug("requestTime middleware!");
    next();
  }
  app.use(requestTime);

// const hello = require("./router/hello");
// const login = require("./router/login");

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

const controller = require("./controller");
app.use(controller);
//controller(app);




// var s = env.render('hello.html', { name: '小明' });
// console.log(s);

// console.log(env.render('extend.html', {
//     header: 'Hello',
//     body: 'bla bla bla...'
// }));

// // add url-route:
// router.get('/hello/:name', async (ctx, next) => {
//     //console.debug(ctx.request);
//     console.debug(url.parse(ctx.request.url));
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });

// router.get('/', async (ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>
//         <form action="/signin" method="post">
//             <p>Name: <input name="name" value="koa"></p>
//             <p>Password: <input name="password" type="password"></p>
//             <p><input type="submit" value="Submit"></p>
//         </form>`;
// });

// router.post('/signin', async (ctx, next) => {
//     var
//         name = ctx.request.body.name || '',
//         password = ctx.request.body.password || '';
//     console.log(`signin with name: ${name}, password: ${password}`);
//     if (name === 'koa' && password === '12345') {
//         ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Login failed!</h1>
//         <p><a href="/">Try again</a></p>`;
//     }
// });



//实现一个自动扫描router文件夹并加载所有router的middleware;
//console.debug("__dirname", global.__dirname, global.__filename);




// add router middleware:
// app.use(hello.routes());
// app.use(login.routes());

app.listen(3000);
console.log('app started at port 3000...');