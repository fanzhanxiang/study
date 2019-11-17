const after = (times, fn) => { // after可以生成新的函数 等待函数执行次数达到我的预期时执行
    return ()=>{
        if(--times === 0){
            fn();
        }
    }
};
let newAfter = after(3, () => {
  console.log("三次后调用");
});
newAfter();
newAfter();
newAfter();
// lodash after

// 并发的问题  发布订阅 观察者模式