// fs 操作文件
// 删除文件 给文件改名
const fs = require("fs");
const path = require('path');
// fs.rename('./copy.md','./c.md',function(){});
// fs.unlink('./c.md',function(){});
// 文件的操作
// fs.readFile  fs.existSync fs.access
// fs.writeFile fs.copyFile()
// fs.rename fs.unlink

// 文件的操作
// 创建目录  删除目录  读取目录

// 想创建目录
// function mkdir(paths, callback) {
//    paths =  paths.split('/');
//    let index = 1;
//    function next(){
//      if(index === paths.length+1) return callback(); // 说明整个目录全部创建完毕
//      let dirPath = paths.slice(0,index++).join('/');
//      fs.access(dirPath,function(err){
//          if(err){
//              // 不存在
//              fs.mkdir(dirPath,next)
//          }else{
//             next(); // 存在创建下一层
//          }
//      })
//    }
//    next();
// }
// mkdir("a/b/c/d/e/f", function() {
//   console.log("创建完成");
// });

// fs.rmdir fs.readdir fs.stat isFile
// fs.rmdir fs.unlink,先删除儿子 在删除父亲

// fs.readdir('a',function(err,dirs){
//     dirs = dirs.map(dir=>path.join('a',dir));
//     dirs.forEach(dir=>{
//         // 判断当前路径状态的
//         fs.stat(dir,function(err,statObj){
//             if(statObj.isFile()){
//                 fs.unlink(dir,function(){});
//             }else{
//                 fs.rmdir(dir,()=>{})
//             }
//         });
//     })
// });

// 递归删除目录 异步 尝试的写同步
// 1)
// 深度 先序 串联 
// function preSeriesDeep(dir,callback){
//     // 有儿子就删除儿子
//     // 儿子删除完毕后删除自己  只想 第一层和第二层的关系
//     fs.stat(dir,function(err,statObj){
//         if(statObj.isFile()){
//             // 是文件删除即可
//             fs.unlink(dir,callback);
//         }else{
//             fs.readdir(dir,function(err,dirs){
//                 // dirs 是读取到的儿子 // [b,1.js,e]
//                 dirs = dirs.map(item=>path.join(dir,item));
//                 let index = 0;
//                 function next(){ // 取出第一个删除掉
//                     if(index == dirs.length) return fs.rmdir(dir,callback)
//                     let currentPath = dirs[index++];
//                     // 删除当前第一个儿子 成功后删除第二个儿子
//                     preDeep(currentPath,next); 
//                 }
//                 next();
//             })
//         }
//     })
// }
// 2)
// function preParallDeep(dir,callback){
//     fs.stat(dir,function(err,stat){
//         if(stat.isFile()){
//             fs.unlink(dir,callback); // 是文件就删除掉
//         }else{
//             fs.readdir(dir,function(err,dirs){
//                 dirs = dirs.map(item=> path.join(dir,item));
//                 // console.log(dirs); // [ 'a/1.js', 'a/b', 'a/c' ] Promise.all
//                 if(dirs.length === 0){ // 如果没有儿子几点 直接将自己删除掉即可
//                     return fs.rmdir(dir,callback);
//                 }
//                 let index = 0;
//                 function done(){ // 如果删除的儿子数量 和自己的index相等说明儿子都删除完毕了
//                     if(++index === dirs.length) return fs.rmdir(dir,callback)
//                 }
//                 dirs.forEach(dir=>{ //
//                     preParallDeep(dir,done)
//                 })
//             })
//         }
//     });
// }


// 变成promise =》 async + await

// 3)
// function preParallDeep(dir){
//     return new Promise((resolve,reject)=>{
//         fs.stat(dir,function(err,statObj){
//             if(statObj.isFile()){
//                 fs.unlink(dir,resolve)
//             }else{
//                 fs.readdir(dir,function(err,dirs){
//                     // preParallDeep(a/b) preParallDeep(a/q)
//                     dirs = dirs.map(item=>preParallDeep(path.join(dir,item))); // [1,2,3]
//                     Promise.all(dirs).then(()=>{
//                         fs.rmdir(dir,resolve)
//                     })
//                 })
//             }
//         });
//     })
// }
// 4) async + await 
let {unlink,readdir,stat,rmdir} = require('fs').promises
async function preParallDeep(dir){
    let statObj = await stat(dir);
    if(statObj.isFile()){
        await unlink(dir);
    }else{
       let dirs =  await readdir(dir);
       dirs = dirs.map(item=>preParallDeep(path.join(dir,item)));
       await Promise.all(dirs);
       await rmdir(dir);
    }
}
preParallDeep('a').then(function(){
    console.log('删除成功啦')
});

function wide(dir) {
    let arr = [arr];
    let index = 0;
    let current;
    // current = arr[index++] ->这种写法是先赋值给current再判断current是否为true
    while(current = arr[index++]) {
        let dirs = fs.readFileSync(current);
        dirs = dirs.map(item=>path.join(current.item));
        arr = [...arr,...dirs];
    }
}