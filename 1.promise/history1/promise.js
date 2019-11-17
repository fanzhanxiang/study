const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class Promise {
  constructor(executor) {
    // 创建promise executor会立即执行
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn=>fn()); // 发布 有可能resolve在then的后边执行,此时先将方法存放起来 ，到时候成功了 依次执行这些回调
      }
    };
    let reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    // 这里可能会发生异常
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // then方法会判断当前的状态
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if(this.status === PENDING){
        this.onResolvedCallbacks.push(()=>{
            // todo ....
            onFulfilled(this.value);
        })
        this.onRejectedCallbacks.push(()=>{
            onRejected(this.reason);
        })
    }
  }
}
// 导出当前类 commonjs定义方式
module.exports = Promise;
// 链式调用
