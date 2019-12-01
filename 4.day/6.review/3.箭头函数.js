// 箭头函数的特点 没有 this arguments prototype,没有就向上找
// let a = 100; // 此属性不会放到全局上
// let obj = {
//     a:1,
//     fn:()=>{ // this => obj 没有this指向从而解决了this问题
//         setTimeout(()=>{ 
//             console.log(this.a);
//         })
//     }
// }
// obj.fn();
// 数组的特性
// forEach filter map find findIndex some every reduce

// 收敛
let total = [{price:10,count:5},{price:10,count:5},{price:10,count:5}].reduce((prev,current,index,arr)=>{
    return prev + current.price * current.count
},0);

// 我有一个数组 可以求平均 求和 求 最大值 

// 数组扁平化 收敛
console.log([1,[2,[3,[4,[5]]]]].flat(100));



// 函数的组合 compose redux

function sum(a,b){
    return a+b;
}
function len(str){
    return str.length;
}
function addCurrency(val){
    return '￥'+ val
}
// function compose(...args){
//     return function(...values){
//         let fn = args.pop(); // 先取出最后一项
//         return args.reduceRight((prev,current)=>{ // prev = abcbed
//             return current(prev); // 把上一次计算的结果传递给下一个函数
//         }, fn(...values)); // abcbed
//     }
// }

// redux 
// const compose = (...args) => (...values)=>{
//     let fn = args.pop(); // 先取出最后一项
//     return args.reduceRight((prev,current)=> current(prev), fn(...values)); // abcbed
// }

prev = addCurrency
current = len

prev = function(...values){
    return addCurrency(len(...values))
}
current = sum;

returnValue = function(...values){
    return addCurrency(len(sum(...values)))
    // return function(...values){
    //     return addCurrency(len(...values))
    // }(sum(...values))
 }

function compose(...args){
    return args.reduce((prev,current)=>{
        return function(...values){
           return prev(current(...values))
        }
    })
}
const compose = (...args) => args.reduce((a,b)=>(...val)=>a(b(...val)));
let r = compose(addCurrency,len,sum)('abc','bed');
// let r = addCurrency(len(sum('abc','bed')))
console.log(r);
// 反柯里化 
// 数组扁平化

// compose 组合多个函数

// 模板字符串 实现模板引擎

let r = [].reduce((p,c)=>{

},1);
console.log(r);


// 实现reduce原理
// 1,反柯里化
// 2.flatten
// 3.Array.prototype.reduce
