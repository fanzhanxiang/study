const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
// Object.defineProperty(x,'then',{
//   get(){
//     throw new Error();
//   }
// })
// promise的处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
  // 处理x 的类型 来决定是调用resolve还是reject
  // 必须要写的很严谨 
  if(promise2 === x){ // 自己等待自己完成
    return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`));
  }
  // 判断x 是不是一个普通值 先认为你是一个promise
  if((typeof x === 'object' && x!==null) || typeof x ==='function'){
    // 可能是promise  如何是不是promise then
    let called; // 默认没有调用成功 和失败
    try{
      let then = x.then; // 看一看有没then方法
      if(typeof then === 'function'){ // {then:function(){}}
        // 是promise了
        // x.then(()=>{},y=>{}) 会再去取then方法
        then.call(x,y=>{ // 如果是一个promise 就用采用这个promise的结果
          // y 有可能还是一个promise 实现递归解析
          if(called) return
          called = true
          resolvePromise(promise2,y,resolve,reject)
        },r=>{
          if(called) return; // 防止多次调用
          called = true
          reject(r)
        })
      }else{ // [1,2,3]
        resolve(x); // 常量直接抛出去即可
      }
    }catch(e){
      if(called) return; // 防止多次调用
      called = true
      reject(e); // 取then抛出异常就 报错好了
    }
  }else{
    // 不是promise
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if(value instanceof Promise){
        // 如果一个promise resolve了一个新的promise 会等到这个内部的promise执行完成
        return value.then(resolve,reject); // 和resolvePromise的功能是一样的
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // 可选参数 没传 就给你一个默认参数即可
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
    onRejected = typeof onRejected === 'function'?onRejected:err=>{throw err};
    // then方法调用后应该返还一个新的promise
    let promise2 = new Promise((resolve, reject) => {
      // 应该在返回的promise中 取到上一次的状态 来决定这个promise2是成功还是失败
      if (this.status === FULFILLED) {
        // 当前onFulfilled，onRejected不能再当前的上下文中执行，为了确保代码promise2存在
        setTimeout(() => {
          try {
            // 让then中的方法执行 拿到他的返回值
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // todo ....
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
  catch(errCallback){ // 没有成功的then
    return this.then(null,errCallback)
  }
  static reject(reason){ // 创建了一个失败的promise
    return new Promise((resolve,reject)=>{
      reject(reason);
    })
  }
  static resolve(value){ // 创建了一个成功的promise
    return new Promise((resolve,reject)=>{
      resolve(value);
    })
  }
}
Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject
  })
  return dfd;
}
module.exports = Promise;

// 先全局安装 在进行测试 promises-aplus-tests 文件名
// https://github.com/promises-aplus/promises-tests