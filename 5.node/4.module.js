// module 模块
// node中js文件就是一个模块
// 为什么出现模块的概念 防止命名冲突，可以把同样的功能封装到一起
// esModule commonjs规范
// 一个文件是一个模块
// module.exports 导出给别人使用
// require 来引用别人的模块

// 1) node模块 会按照后缀名查找 .js 文件是否存在 .json文件
const path = require("path");
const fs = require("fs");
const vm = require("vm");
function Module(id) {
  this.id = id;
  this.exports = {}; // 模块的结果
}
Module.wrapper = [
  "(function(module,exports,require,__filename,__dirname){",
  "})"
];
Module.extensions = {
  ".js"(module) {
    let script = fs.readFileSync(module.id, "utf8");
    let fnStr = Module.wrapper[0] + script + Module.wrapper[1];
    let fn = vm.runInThisContext(fnStr); // 让字符串变成js代码
    // 第一个参数是改变this指向  module  module.exports
    fn.call(
      module.exports,
      module,
      module.exports,
      req,
      module.id,
      path.dirname(module.id)
    );
    // exports 已经让用户更改了
  }, // js需要将exports 传入给用户 用户自己赋值
  ".json"(module) {
    // 解析后 node默认会赋值
    let script = fs.readFileSync(module.id, "utf8");
    module.exports = JSON.parse(script);
  }
};
// 给你一个相对路径 解析成绝对路径
Module.resolveFileName = function(filename) {
  // 1) 把相对路径转化成绝对路口 默认会先判断一下是否是绝对路径
  let absPath = path.resolve(__dirname, filename);
  let flag = fs.existsSync(absPath); // 判断文件是否存在 异步方法被废弃
  let current = absPath; // 默认是当前路径
  if (!flag) {
    let keys = Object.keys(Module.extensions);
    for (let i = 0; i < keys.length; i++) {
      current = absPath + keys[i]; // 当前找到的文件路径
      let flag = fs.existsSync(current);
      if (flag) {
        break;
      } else {
        current = null;
      }
    }
  }
  if (!current) {
    // 如果没有 说明加了后缀文件还是不存在
    throw new Error("文件不存在");
  }
  return current; // 返回文件的路径
};
Module.prototype.load = function() {
  // 模块加载就是读取文件的内容
  let ext = path.extname(this.id);
  Module.extensions[ext](this); // 根据不同的后缀 调用不同的处理方法
};
Module.cache = {};
function req(filename) {
  // 自己实现了一个require方法
  let current = Module.resolveFileName(filename);
  if (Module.cache[current]) {
    return Module.cache[current].exports;
  }
  let module = new Module(current); // 产生一个module
   Module.cache[current] = module;
  module.load();

  return module.exports; // 默认导出module.exports对象
}
let json = require("./a1");
json = require("./a1");
console.log(json);

// node中的模块 3类 文件模块  第三方模块 需要安装 内置模块 fs
// 模块的查找路径

// 先找文件，找不到的话 找文件夹  
// 第三方模块查找

require('commander'); // 找不到会像上级查找node_module 直到根目录如果跟目录找不到则报错, 会先找main 对应的字段如果有直接查找，如果没有main 会找index.js / index.json


// vue store.js  store

// npm + buffer 的使用fs 
// 流 http