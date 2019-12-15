const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
const path  =require('path');
const uuid = require('uuid'); // 第三方
Buffer.prototype.split = function(sep){
  let len = Buffer.from(sep).length; // 分割符的长度
  let offset = 0;
  let result = [];
  let current;
  // 把找到的位置赋给current  看一下是否为-1
  while((current = this.indexOf(sep,offset))!==-1){
      result.push(this.slice(offset,current)); // 把每次的记过push到数组中
      offset = current + len // 增加查找偏移量
  }
  result.push(this.slice(offset)); // 最后一段追加进去
  return result;
}
// const bodyparser = require('koa-bodyparser'); // 不支持图片个数
function bodyparser() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = [];
      ctx.req.on("data", function(chunk) {
        arr.push(chunk);
      });
      ctx.req.on("end", function() {
        // 如果当前提交过来的数据 不是正常 json 、 表单格式 我们需要自己解析)

        let type = ctx.get('content-type');
        if(type.includes('multipart/form-data')){
          let buff = Buffer.concat(arr);
          let bonduary = type.split('=')[1];
          bonduary = '--' + bonduary;
          let lines = buff.split(bonduary).slice(1,-1);
          let obj = {};
          lines.forEach((line)=>{
            let [head,content] = line.split('\r\n\r\n'); // ?  自己算
            head = head.toString();
            let key = head.match(/name="(.+?)"/)[1]
            if(head.includes('filename')){
              // 文件
              let filename = uuid.v4()
              fs.writeFileSync(path.resolve(__dirname,'upload',filename),content.slice(0,-2),'utf8');
              obj[key] = filename
            }else{
              obj[key] = content.slice(0,-2).toString();
            }
          });
         ctx.request.body = obj; 
          resolve();
        }else{
          resolve();
        }
      });
    });
    await next();
  };
}
app.use(bodyparser());
app.use(async (ctx, next) => {
  if (ctx.path === "/form" && ctx.method === "GET") {
    ctx.set("Content-Type", "text/html;charset=utf-8");
    ctx.body = fs.createReadStream("./form.html");
  } else {
    await next();
  }
});
app.use(async (ctx, next) => {
  console.log(ctx.path,ctx.method);
  if (ctx.path === "/login" && ctx.method === "POST") {
    console.log(ctx.request.body)
    ctx.set("Content-Type", "text/plain;charset=utf-8");
    ctx.body = ctx.request.body;
  }
});
app.on('error',function(err){ // catch 方法
  console.log(err)
})
app.listen(3000); // 监听3000 端口

// 正则
// (.+)默认是贪婪匹配

// (.+?)为惰性匹配

// “+”元字符规定其前导字符必须在目标对象中连续出现一次或多次。

// “*”元字符规定其前导字符必须在目标对象中出现零次或连续多次。

// “?”元字符规定其前导对象必须在目标对象中连续出现零次或一次