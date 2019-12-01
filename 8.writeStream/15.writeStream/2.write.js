

// 我预计写10个数 同步的写
let fs = require('fs');
let WriteStream = require('./writeStream')
let ws = fs.createWriteStream('./1.txt',{
    highWaterMark:3,// 表示预期占用几个内存
    encoding:'utf8',// 写入的编码
    start:0, // 从文件的第0个位置开始写入
    mode:438,
    flags:'w' // 默认操作是可写
});

// ws.write('1','utf8',function(){
//     console.log('1写入成功')
// })
// ws.write('2','utf8',function(){
//     console.log('2写入成功')
// })
// ws.write('3','utf8',function(){
//     console.log('3写入成功')
// })
// 多个异步并发问题 靠的就是回调
let index = 0;
function write(){
   let flag = true
    while(index<10 && flag){ // 可写流写入的数据只能是字符串或者buffer
        // 因为我限制了调用write方法的次数
        flag = ws.write(index+'');
        index++;
    }
    // if(index > 9){
    //     ws.end('hello'); // 关闭文件 关闭可写流
    // }
}
write();
// 只有当我们写入的个数达到了 预计的大小并且被写入到文件后清空了 才会触发drain
ws.on('drain',function(){ // 3 3 3 1
    console.log('干了');

    write();
});
// 用户注册了close事件
ws.on('close',function(){
    console.log('close');
})

// 队列 -》聊表