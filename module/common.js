'use strict';
var fs = require('fs');
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('sample.txt', 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log("1111");
                resolve(data);
            }
        });
    });
}

module.exports = {
    "readFile": readFile
}