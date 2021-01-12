'use strict';
//const router = require('koa-router')();

const view = require("../view");


let getName = () => {
   return new Promise((resove, reject) => {
        setTimeout(() => {
            resove("smith")
        }, 5000);
   }); 

}


let fn_hello = async (ctx, next) => {
    //console.debug(ctx.request);
    //console.debug(url.parse(ctx.request.url));
    var name = ctx.params.name;
    //ctx.response.body = `<h1>Hello, ${name}!</h1>; this is in hello.js router`;

    name = await getName();
    console.debug("name:", name);
    let html = view.render('hello.html', { "name": name });
    //console.debug("html", html);
    ctx.response.body = view.render('hello.html', { "name": name });
    //console.debug("ctx.render", ctx.render); //注意：ctx.render 并没有render方法，可以写一个middleware 给ctx加上此方法；
    //ctx.render('hello.html', { "name": name });
};


module.exports = {
    "GET /hello/:name" : fn_hello
};

