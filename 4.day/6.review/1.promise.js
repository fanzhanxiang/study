// let p = new Promise((resolve,reject)=>{
//     resolve();
// })
// 1).中断promise链 就是返回一个等待的promise
// let p1 = p.then(()=>{
//     console.log('ok');
//     return new Promise(()=>{})
// }).then(()=>{
//     console.log(1);
// })

// 2.finally 实现
// Promise.prototype.finally = function(callback){
//     // callback 直接放到失败里 会导致无法继承上一次的失败
//     // return this.then(callback,callback);
//     return this.then((val)=>{
//         // 等待finally中的函数执行完毕 继续执行 finally函数可能返还一个promise 用Promise.resolve等待返回的promise执行完
//         return Promise.resolve(callback()).then(()=>val);
//         //return val; // 如果上一个then是成功就将这个成功向下传递
//     },(err)=>{
//         return Promise.resolve(callback()).then(()=>{throw err});
//         //throw err; // 如果上一个then是失败就将这个失败继续向下抛
//     })
// }
// Promise.reject().finally(()=>{
//     console.log(1);
//     return new Promise((resovle,reject)=>{
//         setTimeout(() => {
//             resovle();
//         }, 1000);
//     })
// }).catch(e=>{
//     console.log(e);
// })

// 3) race 赛跑 哪个快 用哪个 all是所有完成才完成

// let p1 = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve('ok1');
//     }, 1000);
// })
// let p2 = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve('ok2');
//     }, 2000);
// })
// Promise.race = function(promises){
//     return new Promise((resolve,reject)=>{
//         for(let i = 0;i<promises.length;i++){
//             promises[i].then(resolve,reject); // 只要一个成功就成功
//         }
//     })
// }
// Promise.race([p1,p2]).then(data=>{
//     console.log(data)
// });
// 我有一个网站有一个接口 在两个服务器上

// 4）如何放弃某个promise的执行结果
// function wrap(p1){
//     let fail = null;
//     let p2 = new Promise((resolve,reject)=>{
//         fail = reject; // 先将p2失败的方法暴露出来 
//     });
//     let p = Promise.race([p2,p1]); // race方法返回的也是一个promise
//     p.abort = fail;
//     return p
    
// }
// let p = wrap(new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve('ok');
//     }, 3000);
// }))
// p.abort('error');
// p.then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// });
// 5）既能捕获同步有能捕获异步

function fn(){
    // 可能函数中抛出了 同步错误 要通过try-catch 捕获异常
    // throw new Error('err');
    //    return new Promise((resolve,reject)=>{
    //        setTimeout(() => {
    //         reject('xxx');
    //        }, 3000);
    //    })
}
Promise.try = function(callback){
    return new Promise((resolve,reject)=>{
        // Promise.resolve 只能返回一个成功的promise
        return Promise.resolve(callback()).then(resolve,reject);
    })
}
Promise.try(fn).then((data)=>{
    console.log(data,'---');
},err=>{
    console.log('err:'+err);
}); 
