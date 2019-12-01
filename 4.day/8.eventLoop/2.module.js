// 模块 es模块  commonjs模块

// AMD requirejs CMD seajs 

// commonjs 只是一个规范
// 每个文件都是一个模块
// 如果别人想使用我 就需要require
// 我要想给别人用 就需要module.exports

// 怎么实现模块化? 防止命名冲突 
// 命名空间  无法彻底解决命名问题
// 自执行函数 node 让js 拥有了在服务端执行的能力，可以读写文件



// 核心逻辑
// require()
// Module._resolveFilename 解析文件的名字 获取文件的绝对路径
// module.load(filename); 加载模块
// fs.readFileSync(filename, 'utf8'); 同步的读取文件内容
// 加函数
// 让函数执行将 module.exports 传入给用 用户会给moudle.exports 赋值
// 把module.exports返回


// 1） 实现反柯里化
// 2) flat实现
// 3) 模拟Array.prototype.reduce
// 自己打一遍断点 模块化
// npm 模块的特点 node事件环 
// fs应用 树的遍历
// http  tcp net 