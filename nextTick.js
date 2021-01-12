'use strict';

//JavaScript程序是由事件驱动执行的单线程模型
//如果我们想要在下一次事件响应中执行代码，可以调用process.nextTick()：

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
    console.log('nextTick callback!');
});

console.log('nextTick was set!');
console.log('this is 1.');
console.log('this is 2.');

// 打印结果说明： 这说明传入process.nextTick()的函数不是立刻执行，而是要等到下一次事件循环。
//expected print as below:

//nextTick was set!
//this is 1.
//this is 2.
//nextTick callback!


//判断JavaScript执行环境
if(typeof window !== "undefined") {
    console.debug("running on browser");
}else{
    console.debug("running on nodejs");
}


// node程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});