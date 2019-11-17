//  const Promise = require('./promise');
// 如果一个promise then的方法中返回了一个普通值
let p = new Promise((resolve,reject)=>{
     resolve('hello');
})
let promise2 = p.then(data=>{ // 我等待着我洗衣服
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('pppp')
        }, 1000);
    })
})
promise2.then((data)=>{
   throw new Error('err');
},(err)=>{
    console.log(err);
}).then(null,err=>{
    console.log(err,'11');
})