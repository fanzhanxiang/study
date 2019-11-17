const fs = require('fs');
let school = {}
let e = { // events模块   vue $on $once $off
    arr:[],
    on(fn){ // [fn1,fn2]
        this.arr.push(fn); // redux
    },
    emit(){
        this.arr.forEach(fn => fn());
    }
}
e.on(()=>{ // 订阅
    console.log('ok')
})
e.on(()=>{ // 订阅
    if(Object.keys(school).length === 2){
        console.log(school)
    }
})
fs.readFile('name.txt','utf8',(err,data)=>{
    school['name'] = data;
    e.emit(); // 发布
}); 
fs.readFile('age.txt','utf8',(err,data)=>{
    school['age'] = data;
    e.emit();
}); 
// 发布订阅模式  => 观察者模式 （vue watcher）
// 发布订阅模式没有关系的
// 观察者模式  我加小宝宝 心情好  