let EventEmitter = require('events');
let fs = require('fs');
class WriteStream extends EventEmitter{
    constructor(path,options = {}){
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 16*1024
        this.encoding = options.encoding || 'utf8';
        this.start = options.start || 0;
        this.mode = options.mode || 0o666;
        this.flags = options.flags || 'w';
        // 先打开文件
        this.open(); 
        // 缓存区 
        this.cache = []; 
        this.writing = false; // 判断是否正在被写入
        this.len = 0; // 缓存区的大小
        this.needDrain = false; // 是否触发drain事件
        this.offset = this.start; // offset 表示每次写入的偏移量
    }
    open(){// 先打开文件
        fs.open(this.path,this.flags,(err,fd)=>{
            this.fd =fd;
            this.emit('open',fd);
        })
    }
    write(chunk,encoding=this.encoding,callback){// 用户会同步的调用write方法
        // 此时这里面 用户调用write方法时 需要判断当前是否正在写入，如果正在写入 放到缓存中，如果不是正在写入 需要把他真正的像文件里写入
        // 1)判断这个chunk 是不是buffer 如果不是buffer转化成buffer
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
        this.len+=chunk.length; // 统计写入数据的个数
        let flag = this.len  < this.highWaterMark;
        this.needDrain = !flag; // 正好是相反操作 只有当前写入的内容>=了highWaterMark才会触发
        if(this.writing){ // 当前是否正在写入
            this.cache.push({ // 将除了第一次真实像文件中写入的其他都放到缓存中
                chunk,
                encoding,
                callback
            })
        }else{
            this.writing = true; // 标识是否正在写入
            this._write(chunk,encoding,()=>{
                callback && callback(); // 先执行自己的成功操作
                this.clearBuffer();// ???? // 在去清空队列中的第一个
            });// 真实像文件中写入
        }
        return flag;
    }
    clearBuffer(){
        // console.log('清空队列中的数据');
        // 去缓存中取
        let obj = this.cache.shift();
        if(obj){ // 需要写入
            this._write(obj.chunk,obj.encoding,()=>{
                obj.callback && obj.callback(); 
                this.clearBuffer();
            });
        }else{
            if(this.needDrain){
                this.needDrain = false; // 下一次需要重新判断是否需要触发drain事件
                this.writing = false; //告诉下一次调用write 应该像文件中写入
                this.emit('drain');
            }
        }
    }
    // 核心的写入方法
    _write(chunk,encoding,clearBuffer){
        if(typeof this.fd !=='number'){ //  write方法相对于open 是先调用的
            return this.once('open',()=>this._write(chunk,encoding,clearBuffer))
        }
        // todo 写入操作
        // fd 文件描述符 flags 是读取还是写入 chunk 写入的数据 0表示把数据的第0个位置开始写入，读取buffer多少个字节,每次写入文件的偏移量
        fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,written)=>{
            // written 表示真实写入的个数
            this.offset += written; // 增加偏移量
            this.len -= written; // 减少缓存中的数据
            clearBuffer(); // 清空缓存
        })
    }
    close(){
        fs.close(this.fd,()=>{
            this.emit('close')
        })
    }
    end(chunk,encoding){   // end 方法就是如果传递参数 就需要调用this._write方法
        if(chunk){
            // chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
            // 先讲写入的缓存 强制清空 在去写入end方法中的内容 在关闭文件
            return this.write(chunk,encoding,()=>{
              this.close()
            })
        }
        this.close();
    }
}

module.exports = WriteStream;