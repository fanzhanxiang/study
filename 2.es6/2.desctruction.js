// 解构赋值  ...

// 解构的方式都是根据key来实现
// let [,age] = ['姓名','年龄'];
// console.log(age);

// 用：号来重新命名  = 可以用来赋值默认值
// let {name,age:age1,address="回龙观"} = {name:'珠峰',age:10};
// console.log(name,age1,address);


// 剩余运算符  只能用在最后一项
// let [,...args] = ['珠峰',10,'回龙观']; // slice
// console.log(args);


// 对象的剩余运算符
let {name,...args} = {name:'珠峰',age:10};
console.log(args);


// 展开运算符  合并数组 、 合并对象
// concat 
// let a1 = [1,2,3];
// let a2 = [4,5,6,1,2,3];
// console.log([...a1,...a2]); // 数组的去重 数组的交集 差集

// // （set + map) set 和map 是es6中新的数据类型 不能放重复的
// let set = new Set([1,2,3,3,2,1]);
// console.log(set); // 没有key属性

// set.add(4);
// // set.clear()// 清除
// // set.delete(); // 删除某一项
// console.log(set.entries()) // Object.entries Object.keys   Object.values

// // Symbol.iterator
// set.forEach(item=>{
//     console.log(item);
// })
// console.log(set.has(1))

// union
let a1 = [1,2,3];
let a2 = [4,5,6,1,2,3];
// let s1 = new Set([...a1,...a2]);
// console.log([...s1]);

// 数组的交集  和 差集 has来实现  set方法只有forEach方法
let s1 = new Set([...a1]); // [1,2,3]
let s2 = new Set([...a2]); // [1,2,3]
let a3 = [...s2].filter((item=>{ // 返回的是一个新的数组
   return  !s1.has(item); // map是映射一个新的数组 但是不会比以前的项少 
}));
console.log(a3);
// map 和set 用法基本一致

