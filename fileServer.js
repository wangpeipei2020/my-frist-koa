'use strict';
//http模块实现一个简单的静态文件服务器

const fs = require('fs');
const url = require('url');//解析字符串为一个Url对象
const path = require('path');
const http = require('http');  //http模块封装了request和response对象。

//console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

//console.log("process.argv", process.argv);

let root = process.argv[2] || ".";  //读取命令行文件夹参数，默认为当前目录 .
console.debug("the static root folder:", root);

// 解析当前目录:
//const workDir = path.resolve(root); // '/Users/michael'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
//const filePath = path.join(workDir, 'static', 'index.html');

// console.log("workDir", workDir);
// console.log("filePath", filePath);

// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    console.debug(url.parse(request.url));
    var pathname = url.parse(request.url).pathname;
    console.debug("pathname:", pathname);
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(__dirname, root, pathname);

    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err) {
            if(stats.isFile()){
                ;
            }else if(stats.isDirectory()){
                filepath = path.join(__dirname, root, "index.html");
            }
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            //由于response对象本身是一个Writable Stream，直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');

//测试命令： node fileServer.js static
//测试URL： http://localhost:8080/index.html