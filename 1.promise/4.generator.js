// 生成器 生成迭代器的 es6语法
// async + await
// redux-saga

// 返回值叫迭代器
// function * read(){
//     yield 1; //产出
//     yield 2;
//     yield 3
// }
// // iterator 迭代器
// let it = read();
// console.log(it.next()); // {value:1,done:false}
// console.log(it.next());
// console.log(it.next());
// console.log(it.next()); // return unefined

// 将类数组转化成数组
// 类数组的定义 ： 1索引 2.长度


function add() {
  // ... for of 必须要给当前对象 提供一个生成器方法

  console.log([ // ... Array.from
    ...{
      0: 1,
      1: 2,
      2: 3,
      length: 3,
      [Symbol.iterator]:function *(){
          let index = 0;
          while(index !== this.length){
              yield this[index++];
          }
      }
    //   [Symbol.iterator]() {
    //     let len = this.length;
    //     let index = 0;
    //     // 迭代器 是有next方法 而且方法执行后 需要返回 value,done
    //     return {
    //       next: () => {
    //         return { value: this[index++], done: index === len + 1 };
    //       }
    //     };
    //   }
    }
  ]);
}
add(1, 2, 3, 4, 5);





// function * read(){
//     try{
//         let a = yield 1;
//         console.log(a)
//         let b = yield 2;
//         console.log(b)
//         let c = yield 3;
//         console.log(c)
//     }catch(e){
//         console.log('e:'+e);
//     }
// }
// let it = read();
// console.log(it.next('xxx')) // {value:1.done:false} 第一次next参数没有任何意义
// it.throw('xxx')
const fs = require('fs').promises;
function * read(){
   let content =  yield fs.readFile('./name.txt','utf8'); // age.txt
   let age =  yield fs.readFile(content,'utf8'); // 10
   let xx = yield {age:age + 10}
   return xx;
}
function co(it){
    return new Promise((resolve,reject)=>{
        // 异步迭代需要先提供一个next方法
        function next(data){
            let {value,done} = it.next(data);
            if(!done){
                Promise.resolve(value).then(data=>{
                    next(data);
                },err=>{
                    reject(err);
                })
            }else{
                resolve(value);
            }
        }
        next();
    })
}
// let co = require('co');
co(read()).then(data=>{
    console.log(data);
});
// let it = read();
// it.next().value.then(data=>{
//     it.next(data).value.then(data=>{
//         let r = it.next(data);
//         console.log(r.value);
//     })
// })


const fs = require('fs').promises;
// async + await 其实是 generator + co的语法糖
async function  read(){ // async函数返回的是promise
    let r = await Promise.all([p1,p2])
    try{
        let content =  await fs.readFile('./name1.txt','utf8'); // age.txt
        let age =  await fs.readFile(content,'utf8'); // 10
        let xx = await {age:age + 10}
        return xx;
    }catch(e){
        console.log(e);
    }
}
read().then(data=>{
    console.log(data);
},err=>{
    console.log(err);
})


// 作业
// 1) promise.finally
// 2) Promise.try 这个方法 原生里没有
// 3) Promise.race 谁快 用谁
// 4) 如果终止一个promise 不要要当前这个promise结果
// 5) 如果中断promise链

// 练 敲