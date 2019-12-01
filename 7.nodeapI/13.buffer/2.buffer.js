// 把二进制表现成了10进制 可以和字符串进行转化

// 1) buffer的声明方式 （内存） 数组可以扩展

// 固定大小
let buf = Buffer.allocUnsafe(5); // 出来的结果很像数组
buf.fill(0);
// allocUnsafe + fill =>alloc

buf = Buffer.from([100,120,130]); // 很少用到
console.log(buf);

buf = Buffer.from('珠峰');
console.log(buf)

// 2) buffer常见方法  11.45
// 和数组类似
// 2.1) slice 
let arr = [[1,2,3],3,4,5]; // 浅拷贝
let newArr = arr.slice(0)
newArr[0][1] = 100;
console.log(arr);

let buffer = Buffer.from('珠峰');  // buffer存放的都是内存地址，如果截取某一段 改变的时候也是更改了这个内存地址
let newBuffer = buffer.slice(0);
newBuffer[0] = 100;
console.log(buffer)
// 2.2) 判断buffer类型
console.log(Buffer.isBuffer(buffer)); // 是不是buffer

// 2.3) buffer不能扩展大小
// copy 拷贝
Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart=0,sourceEnd=this.length){
    for(let i = 0;i<sourceEnd - sourceStart;i++){ // 确定循环次数
        // 将每次的循环出的结果 拷贝到目标的buffer上即可
        targetBuffer[targetStart+i] = this[sourceStart+i];
    }
}   
let buff = Buffer.alloc(6);
let buffer1 = Buffer.from('珠');
let buffer2 = Buffer.from('峰');
// 当前buffer.copy(目标buffer,目标的开始位置,源的开始，源的结束)
buffer1.copy(buff,0);
buffer2.copy(buff,3);
console.log(buff.toString());

// 2.4) concat 拼接
Buffer.concat = function(list,length = list.reduce((a,b)=>a+b.length,0) ){
    let buff = Buffer.alloc(length);
    let offset = 0;
    list.forEach(b=>{
        b.copy(buff,offset);
        offset+= b.length
    });
    return buff
}
let newBuffer = Buffer.concat([buffer1,buffer2,buffer2]);
console.log(newBuffer.toString('base64'));  

// isBuffer length 字节数 toString('base64') slice fill 
// 3) 扩展buffer的方法

let buffer = Buffer.from(`珠峰珠峰珠峰
珠峰珠峰珠峰
珠峰珠峰珠峰`);
// 行读取器 文本 

Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length; // 分割符的长度
    let offset = 0;
    let result = [];
    let current;
    // 把找到的位置赋给current  看一下是否为-1 // indexOf的第二个参数是字符串开始查找的位置
    while((current = this.indexOf(sep,offset))!==-1){
        result.push(this.slice(offset,current)); // 把每次的记过push到数组中
        offset = current + len // 增加查找偏移量
    }
    result.push(this.slice(offset)); // 最后一段追加进去
    return result;
}
console.log(buffer.split('\n'));
// split方法