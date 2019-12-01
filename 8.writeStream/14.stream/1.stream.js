// 文件流 文件的读取和操作
// readFile writeFile => read + write  open read close
const fs = require('fs');
let ReadStream = require('./ReadStream');
let rs = new ReadStream('./1.txt',{
    flags:'r', // 当前要做什么操作
    encoding:null, // 默认是buffer
    highWaterMark:2,// 内部会创建 64k大的buffer

    // 读取 默认权限是4 写入默认是2  执行是1
    mode:438,// 打开文件读 操作权限是什么 文件读取 写入权限 执行权限
    autoClose:true,
    start:0,
    end:4 // 包前 又包后
});
// 默认流的模式是暂停模式
rs.on('open',function(fd){
    console.log('文件打开触发open事件',fd)
});
// // 将每次传入的数据 接受到存起来
// let arr = [];
rs.on('data',function(data){ // 每次读取到的结果
    console.log(data);
    // 分片传输
    arr.push(data);
    this.pause(); // 暂停流 
})
setInterval(()=>{
    rs.resume(); // 恢复读取
},1000)
rs.on('end',function(){
    console.log('文件读取完毕')
     console.log(Buffer.concat(arr).toString());
});
rs.on('close',function(){
    console.log('文件关闭')
});
// rs.on('error',function(){
//     console.log('出错了')
// });
// // 可读流 需要掌握的方法 data end Buffer.concat()