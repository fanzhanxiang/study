// 1) 解决并发问题 （同步多个异步方法的执行结果）
// 2) 链式调用的问题 (现获取 name,通过name在获取age) 解决多个回调嵌套的问题


// Promise是一个类
// 1)每次new 一个Promise 都需要传递一个执行器 ，执行器是立即执行的
// 2) 执行器函数中有两个参数 resolve,reject

// 3）默认Promise 有三个状态 pendding =》 resolve 表示成功了fulfilled reject就是拒绝 rejected
// 4) 如果一旦成功了 不能变成失败 一旦失败 不能在成功了 只有当前状态是pending的时候 才能更改状态
// 5) 每个promise都有一个then方法
let Promise = require('../promise')
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('我有钱');
        //throw new Error('失败'); // 如果抛出异常也会执行失败
    },1000)
});
// 没有完全解决回调问题
p.then(data=>{ // 成功的毁掉
    console.log('success',data);
},err=>{
    console.log('error',err) // 失败的回调
})
p.then(data=>{ // 成功的毁掉
    console.log('success',data);
},err=>{
    console.log('error',err) // 失败的回调
})
p.then(data=>{ // 成功的毁掉
    console.log('success',data);
},err=>{
    console.log('error',err) // 失败的回调
})