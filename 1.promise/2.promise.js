// const p = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('ssss');
//     },1000)
// })

// p.then((data)=>{
//     return data;
// },(err)=>{
//    throw err;
// }).then(data=>{
//     console.log('d:'+data);
// },err=>{
//     console.log(err);
// })
let Promise = require('./promise')
const p = new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('hello')
        },1000)
    }))
}).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err,'err');
})
// promise.finally 最终的 无路如何都执行 如果返回一个promise  会等待这个promise执行完成
// Promise.try() ? 可以捕获同步异常和异步异常 
Promise.resolve(123).finally(()=>{
    console.log('finally');
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve()},3000)
    })
}).then(err=>{
    console.log(err)
})

