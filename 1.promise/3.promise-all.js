// promise.all 全部 处理多个异步的并发问题
let fs = require('fs').promises;

// 全部完成才算完成 如果有一个失败 就失败
// Promise.all 是按照顺序执行的 Promise.race
const isPromise = value=>{
    if((typeof value === 'object' && value !== null) || typeof value === 'function'){
        return typeof value.then === 'function';
    }
    return false;
}
Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
        let arr = []; // 存放最终结果的
        let i = 0;
        let processData = (index,data)=>{
            arr[index] = data; // 将数据放到数组中，成功的数量和传入的数量相等的时候 将结果抛出去即可
            if(++i === promises.length){
                resolve(arr)
            }
        }
        for(let i = 0 ;i < promises.length ;i++ ){
            let current = promises[i]; // 获取当前的每一项
            if(isPromise(current)){ // 如果是promise 。。..
                current.then(data=>{
                processData(i,data)
                },reject)
            }else{  
                processData(i,current)
            }
        }
    })
}
// race 有一个成功就成功 有一个失败就失败
Promise.race([fs.readFile('./name.txt','utf8'),fs.readFile('./age.txt','utf8'),1])
.then(data=>{
    console.log(data);
},err=>{
    console.log(err);
});

