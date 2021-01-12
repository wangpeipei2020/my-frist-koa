'use strict';
const router = require('koa-router')();
const fs = require('fs');

console.debug("__dirname", global.__dirname, global.__filename);
    
var files = fs.readdirSync(__dirname + '/router');

// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});
console.debug("js_files", js_files);
// 处理每个js文件:
for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require(__dirname + '/router/' + f);
    //console.debug("mapping", mapping);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`, mapping[url]);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

module.exports = router.routes();

// module.exports = () => {
//     //app.use(async(ctx, next) => {



//         return router.routes();

//         //await next();
//     //});
    
//     //app.use(router.routes());
// }