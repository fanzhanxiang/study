// 柯里化 : 就是将一个函数拆分成多个函数
// 判断类型 Object.prototype.toString.call

// 高阶函数中包含 柯里化  可以保留参数 bind
const checkType = type => {
  return content => {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  };
};
// 闭包
let types = ["Number", "String", "Boolean"];
let utils = {};
types.forEach(type => {
  utils["is" + type] = checkType(type);
});
console.log(utils.isString("123"));
console.log(utils.isNumber("456"));

// 函数柯里化怎么实现


// 通用的柯里化
const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
};
const curring = (fn,arr = [])=>{
    let len = fn.length
    return (...args)=>{
        arr = arr.concat(args); // [1]  [1,2,3] < 5
        if(arr.length < len){
            return curring(fn,arr)
        }
        return fn(...arr)
    }
}
let r = curring(add)(1)(2)(3)(4)(5); // [1,2,3,4,5]
console.log(r);
const checkType = (type, content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
};
let types = ["Number", "String", "Boolean"];
let utils = {};
types.forEach(type => {
  utils["is" + type] = curring(checkType)(type); // 先传入一个参数
});
console.log(utils.isString('hello'));

// after 在...之后