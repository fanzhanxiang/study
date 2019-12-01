// 文件读写 
// const path = require('path');
// const fs = require('fs');
// const vm = require('vm');
// function Module(absPath){
//     this.id = absPath;
//     this.exports = {};
// }
// const wrapper = [ // module 和 exports 是什么关系?
//     '(function(exports,module,require){',
//     '})'
// ]
// Module.prototype.load = function(){
//     let script = fs.readFileSync(this.id,'utf8');
//     let fnStr = wrapper[0] + script + wrapper[1];
//     let fn = vm.runInThisContext(fnStr);
//     fn(this.exports,this,req); // 让拼出的函数执行
// }
// function req(file){ // ./a
//     // 1) 把当前这个文件读取出来  把相对路径转化成绝对路径
//     let absPath = path.resolve(__dirname,file);
//     // 加载一个模块 模块就是要有一个exports属性
//     // 2) 创建一个模块
//     let module = new Module(absPath); // 创建了一个模块
//     // 3) 加载模块
//     module.load();
//     return module.exports
// }

let a = require('./a.js');
console.log(a);


// module  = new Module
// module.exports = { "a":1}
let json = require('./json.json');
console.log(json);







// const fs = require('fs');
// // fs.readFileSync  
// // 判断文件是否存在
// // fs.accessSync('./.gitignore1');// 判断文件是否存在 如果不存在抛出异常

// const path = require('path'); // 专门处理路径的模块
// // __dirname
// console.log(__dirname);
// // resolve 出来的一定是一个绝对路径
// // join 就是以/拼接 有/只能用join
// console.log(path.resolve(__dirname,'a','b','/'));
// console.log(path.join(__dirname,'a','b','/'));
// console.log(path.extname('main.js'))
// console.log(path.basename('main.js','.js'));
// console.log(path.dirname(__dirname)); // 获取父路径


// // commonjs 
// let vm = require('vm'); // 虚拟机模块
// // new Function  eval  vm他提供了一个沙箱环境
// let b = 1000;
// vm.runInThisContext(`console.log(b)`);