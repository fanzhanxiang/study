// 发布订阅模块  pub / sub
let EventEmitter = require("./events");
let util = require('util');
function Girl (){
}
util.inherits(Girl,EventEmitter);
let girl = new Girl;

girl.on('newListener',(type)=>{ // 监听到用户做了哪些监听
    console.log(type)
    if(type === '失恋'){ // 1 1
        process.nextTick(()=>{
            girl.emit(type);
        })
    }
})
// {'失恋':[fn,fn]}
let fn1 = function(){ // 默认这个方法在调用的时候
    console.log('监听到了 执行')
}
girl.once('失恋',fn1); // this.on('失恋',one); one.fn1
girl.off('失恋',fn1);  // one.fn1 != fn1
girl.once('失恋',function(){ // 默认这个方法在调用的时候
    console.log('监听到了 执行')
})

girl.emit('失恋');

// let listener1 = (w) => {
//     console.log('哭'+w)
// };
// let listener2 = (w) => {
//     console.log('逛街'+w)
// };
// girl.on("女生失恋", listener1);
// girl.on("女生失恋", listener2);
// // on emit => new Vue() $on $emit $once $on('change',function())
// girl.emit('女生失恋','我');

// 事件绑定 核心方法
// on emit once newListener off
// 作业


// fs 流 http
// koa