// 反柯里化 让某个函数 跨到应用的范围
Object.prototype.toString.call();
// grunt r.js gulp fis3 webpack rollup parcel 0配置
Function.prototype.uncurrying = function(){ // 
    return (str)=>{
        return this.call(str);
    }
}   
let toString = Object.prototype.toString.uncurrying();
console.log(toString('hello'));
// reduce 实现组合
let app = {
    arr:[],
    use(fn){
        this.arr.push(fn);
    },
    compose(){
        // reduce 那一节  redux的源码
        return this.arr.reduce((a,b)=>(...args)=> Promise.resolve(a(()=>b(...args))))(()=>{})
        // const dispatch = async (index)=>{
        //     if(index === this.arr.length) return;
        //    let middle =  this.arr[index];
        // // ()=>dispatch(index+1)->这里就相当于next，所以需要next从外到里依次执行,这就是洋葱模型,总算是理解洋葱模型了，
        // // next执行的时候才会再执行一遍dispatch方法，才会再执行依次fn,所以需要next执行才会执行下一个方法
        //    return middle(()=>dispatch(index+1));
        // }
        // return dispatch(0);
    },
    run(){
        this.compose().then(()=>{
            console.log('ok');
        })
    }
}
//add  len   sum
app.use((next)=>{
    console.log(1);
    next();
})
app.use((next)=>{
    console.log(2);
    // next();
})
app.use((next)=>{
    console.log(3);
    next();
})

app.run();