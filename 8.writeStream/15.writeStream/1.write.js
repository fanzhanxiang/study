// 可读流 可写流 基于fs

let fs = require('fs');
let path = require('path');

let rs = fs.createReadStream(path.resolve(__dirname,'note.md'),{
    highWaterMark:1 // 每次读取几个  读取是64k
})

let ws = fs.createWriteStream(path.resolve(__dirname,'copy.md'),{
    highWaterMark:3 // 我预计占用的内存空间是多少  写的话是 16k
});
// 暂停模式
let arr = []
rs.on('data',function(data){ // buffer
    arr.push(data);
    // 去做写的操作
    // console.log('读取')
    let flag = ws.write(data); // 做到收支平衡 ,读取一点写一点
    // 这个flag 代表的是当前我预计的内存大小 是否被撑满
    console.log(flag);
})
rs.on('end',function(){
   console.log(Buffer.concat(arr).toString());
   ws.end();
});

// 可读流中有 on('data') on('end')
// 可写流 write 和 end事件