//https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640

const crypto = require('crypto'); //crypto 已经是nodejs的内置模块了

//1： MD5是一种常用的哈希算法
//2： Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：可以把Hmac理解为用随机数“增强”的哈希算法。
//3： AES是一种常用的对称加密算法，加解密都用同一个密钥
//4： RSA算法是一种非对称加密算法，即由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者通过公钥加密，私钥解密。其中，公钥可以公开，私钥必须保密。


//1： md5 哈希算法加密
const hash = crypto.createHash('md5'); //如果要计算SHA1，只需要把'md5'改成'sha1'

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex'));


//2： hmac 增强哈希算法加密
const hmac = crypto.createHmac('sha256', 'secret-key1');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
console.log(hmac.digest('hex'));


//3： AES 加密（对称加密算法）
function aesEncrypt(data, key) {
    const cipher = crypto.createCipheriv('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipheriv('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);


//4： RSA加密 （非对称加密算法）


