const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
const resolvePromise = (promise2, x, resolve, reject) => {
  if(promise2 === x){ // 不能自己等待自己完成
    return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`));
  }
  // 如果x是promise
  if((typeof x === 'object' && x!==null) || typeof x ==='function'){
    let called; 
    try{
      let then = x.then; // 取then的时候 可能会发生异常 getter
      if(typeof then === 'function'){  // 如果是函数
        then.call(x,y=>{  // 就让此函数调用即可
          if(called) return
          called = true // y有可能还是个promise
          resolvePromise(promise2,y,resolve,reject)
        },r=>{
          if(called) return; 
          called = true
          reject(r)
        })
      }else{ 
        resolve(x); 
      }
    }catch(e){
      if(called) return; 
      called = true
      reject(e);
    }
  }else{
    // 不是promise
    resolve(x); // 直接将结果跑出去即可
  }
};
class Promise {
  constructor(executor) { // executor 立即执行的
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => { // 成功
      if (this.status === PENDING) { // 只有当状态是pending的时候
        this.value = value; // 将值保存起来
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => { // 失败
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject); // 出错了 直接退出即可
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) { // 两个回调可能是可选参数
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
    onRejected = typeof onRejected === 'function'?onRejected:err=>{throw err};
    let promise2 = new Promise((resolve, reject) => { // 返回了一个promise
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
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