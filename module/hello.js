'use strict';

const s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

console.debug(module.exports, exports); //{} {}
console.debug(module.exports === exports);  //true;

// exports = {
//     "fn_greet" : greet
// }


module.exports = greet;