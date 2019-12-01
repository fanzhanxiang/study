async function async1(){
    console.log('async1 start')
    //await async2(); // 会被编译出2个then
    // async2().then(()=>{
    //     return 
    // }).then(()=>{
    //     console.log('async1 end')
    // })
    // 浏览器的解析是这个样子
    Promise.resolve(async2()).then(data=>{
        console.log('async1 end')
    })
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1(); // 执行完async 1 就结束了
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout