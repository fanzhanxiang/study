function fn(){
    return new Promise((resolve,reject)=>{
        resolve([1,2,3]);
    })
}
async function getData(){
    // await fn();  
    Promise.resolve(fn()).then(()=>{
        console.log(1)
    })
    // resolve中如果放了一个promise 会等待这个promise 成功后在继续执行
    // new Promise((resolve,reject)=>resolve(fn())).then(()=>{
    //     console.log(1);
    // })
}
getData();
Promise.resolve().then(data=>{
    console.log(2);
});

// 2 1