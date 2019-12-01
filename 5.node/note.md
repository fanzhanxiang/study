## node中的全局对象 
process，buffer
process.cwd()  process.nextTick process.pid process.argv commander process.env 环境变量
require,exports,module,__filename,__dirname (可以直接在模块内部被访问)

## node中的事件环
```
    ┌───────────────────────┐
┌─> │        timers         │ 本阶段执行setTimeout() 和 setInterval() 
│   └──────────┬────────────┘
│   ┌──────────┴────────────┐
│   │     I/O callbacks     │ 这个阶段执行一些诸如TCP错误之类的系统操作的回调
│   └──────────┬────────────┘
│   ┌──────────┴────────────┐
│   │     idle, prepare     │ 只内部使用
│   └──────────┬────────────┘      ┌───────────────┐
│   ┌──────────┴────────────┐      │   incoming:   │
│   │         poll          │  <───┤  connections, │ 获取新的 I/O 事件,查找已经到时的定时器
│   └──────────┬────────────┘      │   data, etc.  │
│   ┌──────────┴────────────┐      └───────────────┘
│   │        check          │ setImmediate()
│   └──────────┬────────────┘
│   ┌──────────┴────────────┐
└──-┤    close callbacks    │ 关闭事件的回调 socket.close事件
    └──────────────────────—┘
```

```javascript
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
```


## node中的模块
- 模块分类 ES6module,commonjs规范 amd,cmd,umd
- commonjs规范
    - 一个文件就是一个模块
    - 如果模块想给别人使用 module.exports / exports 同一个对象但是最终导出的是module.exports
    - 如果想使用这个模块 require (同步读取文件，包一个自执行函数，vm.runInthisContext,传入export对象，最终返回的是exports 对象，所以就可以拿到其他模块的内容)
- 模块的查找规范
    - 第三方模块 module.paths
    - 如果文件和文件夹重名 先取文件，文件不能取到，找文件夹 package.json => main => index.js


