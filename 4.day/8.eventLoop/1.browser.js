// 浏览器的eventLoop 
// 我们代码的执行顺序  微任务 宏任务

// 线程 进程 计算机调度任务的最小单位 是进程 js他是单线程 进程中有一个主线程  
// 渲染线程和 js 线程 是互斥的
// script脚本里执行  （宏任务） （Promise.then）
// 异步代码 需要等待同步等待执行完毕

// 1) 顺序问题
// setTimeout(() => {
//     console.log(1);
//     setTimeout(()=>{
//         console.log(3);
//     },0)
// }, 0);

// 2) 微任务和宏任务执行顺序的问题
setTimeout(()=>{
    console.log('time1')
    Promise.resolve().then(()=>{
        console.log('then 3');
    })
    Promise.resolve().then(()=>{
        console.log('then 4');
    })
},0)
setTimeout(() => {
    console.log('time2');
},0);
Promise.resolve().then(()=>{
    console.log('then 1');
})
Promise.resolve().then(()=>{
    console.log('then 2');
})
// 当前主栈全部执行完毕后 清空微任务 ，会取出一个宏任务 ->  执行完毕后 继续清空微任务 -> 无线循环

//  vue 为什么要提供一个$nextTick  做一个缓存机制
// 下一队列

// [callback,callback,callback,callback]

// nextTick先查看你是否支持promoise
// MutationObserver
// setImmediate // 只在ie下采用
// setTimeout

// MessageChannel
// Observer

// - 微任务： promise.then ，MutationObserver，
// - 宏任务：script ，ajax ， 事件，requestFrameAnimation， setTimeout ，setInterval ，setImmediate （ie下），MessageChannel ，UI rendering。

// 浏览器的事件环 node 11 版本 表现和浏览器一致