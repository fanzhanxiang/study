let fs = require('fs');
let path = require('path');
let r = fs.readFileSync(path.resolve(__dirname,'note.md'));
// 默认文件读取操作 读取出来的都是buffer
// 内存表示方式就是buffer 内存二进制的 十六进制 八进制  十进制
// 进制转化问题 0.1 + 0.2 ！= 0.3  我们需要将值存到内存中 保存的时候存储的是二进制
console.log(r);

// 0.0001100110011001100110011001100110011001100110011001101
// 0.001100110011001100110011001100110011001100110011001101

// 进制转化 小数 *2 取整法
// 0.1 * 2 = 0.2 =>0 
// 0.2 * 2 = 0.4 =>0
// 0.4 * 2 = 0.8 =>0
// 0.8 * 2 = 1.6 =>1
// 0.6 * 2 = 1.2 =>1
// 0.2 * 2 = 0.4 =>0 
// 0.4 * 2 = 0.8 =>0
// 0.8 * 2 = 1.6 =>1

// 整数 进制转化 基于编码
// ASCII(美国) 默认 就一个一个字节来表示是一个字母或者符号
// 1个字节 有8个bit 最大 是 8个1 =》 10进制 255
// 默认 字母 常见符号 \r \n

// gb2312 第一位大于127的我认为+ 第二位 就是一个中文 255 - 127 * 255
// GB18030
// gbk
// 用两个字节来表示中文

// unicode => utf8
// 课表长度 如果是中文采用3个字节来表示,node里默认值支持utf8格式，可以采用别的模块来实现

// 将10进制 转化成其他进制 255 0xff 0b 0o
console.log((0xff).toString(2)); // 值变成了字符串
// 进制转化 将任意进制转化成10进制
console.log(parseInt('0xff',16));

// base64 二进制的值不能超过64  （核心就是进制的转化）
// base64 可以反姐    加密 加密后可以特殊的人解密

// 在浏览器header中吗。任意的url中都可以采用base64，前端实现文件预览 fileReadReader
// 转码后的结果 比原来的内容 大

// 如果一个汉字
console.log(Buffer.from('珠')); // e7 8f a0
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));
// 11100111  10001111  10100000  3*8 = 6*4
// 111001  111000  111110  100000

// base64 转化后去特定的字符串取值
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str+= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
str+= '0123456789+/'
let result = str[0b111001] + str[0b111000] + str[0b111110] + str[0b100000];
console.log(result);

// base64就是编码转化 不需要发送http请求。大小会比以前大
console.log(Buffer.from('珠').toString('base64'));

// unicode => utf8

// 编码转化出现的bug 