let r = [].reduce((memo)=>{

},[])



function coffee(){
    console.log('苦咖啡')
}

function sweetCoffee(){
    coffee();
    console.log('加糖')
}
function milkCoffee(){
    coffee();
    console.log('加牛奶')
}


// vue里我希望调用数组的方法 实现视图的更新
// arr[0] = 123;
// push , shift ,unshift
const update = ()=>{
    console.log('更新')
}

let arr = [];

let oldProto = Array.prototype; // 保留数组原有的原型
let proto = Object.create(oldProto); // 创建了一个新proto
['push','unshift','shift'].forEach(method=>{
    proto[method] = function(...args){
        update();
        oldProto[method].call(this,...args);
    }
})

function observer(obj){ // 只将我们传入的数组中的方法重写
    if(Array.isArray(obj)){
        obj.__proto__ = proto
    }
}
observer(arr);
arr.push(1);
console.log(arr);
[].push(4,5,6)


console.log(module.paths)