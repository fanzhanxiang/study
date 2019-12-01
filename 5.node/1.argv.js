// 浏览器 window对象
// 浏览器无法直接访问global对象 所以需要window 来代理

// 在node中可以直接访问global

// 默认声明的属性时不放在global上的
// node 的特点 每个文件都是一个模块，模块外面包了匿名函数
// module,exports require __dirname __filename
// console.log(this === module.exports);

(function(){
    // console.log(Object.keys(this));
})();
// global 中的属性 交全局属性  + module,exports require __dirname __filename 叫全局对象

// process 进程 开启很多个线程
// Buffer 缓存区 我们node 读取文件 内存中的数据 都是二进制 数据16进制
// clearInterval  setInterval
// clearTimeout setTimeout
// clearImmediate  setImmediate  宏任务

// 命令 window 的目录 mac 的目录不一样的
// 1)console.log(process.platform); // window => win32 mac => 'darwin',
// 2)argv 代表用户传递的参数 默认前两个参数 没有实际意义
// 执行node  node + 文件名执行
// 只能通过 命令 + 文件名 后面是参数 process.argv.slice(2)

// console.log(process.argv.slice(2)); // 收集用户传递的参数
//  '--port', '3000', '--config', 'xxx'  = {port:3000,config:xxx}

let config = process.argv.slice(2).reduce((memo,current,index,array)=>{
    if(current.includes('--')){
        memo[current.slice(2)] = array[index+1];
    }
    return memo;
},{});
// console.log(config);

// commander 命令行的管家 帮你提供--help ,必须先安装
const program = require('commander');
const chalk = require('chalk');
// 解析用户的参数 默认提供--help
program // 配置命令 我输入命令后 要执行一些内容
    .command('create')
    .alias('c')
    .description('create project')
    .action(()=>{
        console.log('create project')
    })
program //配置属性 给代码传递参数
    .option('-p, --port <val>','set port')
    .version('1.0.0')
program.on('--help',()=>{
    console.log('\r\nExamples')
    console.log('  node 1.js --help');
    console.log('  node 1.js create '+chalk.green('project'))
}).parse(process.argv);
// chalk 粉笔
console.log(program.port);

// chdir  cwd() current working directory
// env 环境变量
// nextTicknode 中的微任务