## 初始化包
package.json 
```bash
npm init -y #默认直接生成
```

## 下载包
- 全局安装 在任意命令行下使用
```
npm i http-server -g
```
> 可以在命令中使用

/usr/local/bin/http-server -> /usr/local/lib/node_modules/http-server/bin/http-server
/usr/local/bin/hs -> /usr/local/lib/node_modules/http-server/bin/http-server

我要写一个全局包,npm link链接,创建快捷方式指向我的文件
```
"bin": {
    "lesson-zf": "./bin/www",
    "lz":"./bin/www"
},
```

- 本地安装
```
npm install jquery --save / -S
npm install webpack --save-dev / -D
```

默认不给--save表示安装到当前的dependencies 表示是上线和开发的时候都需要
devDependencies 开发依赖 上线的时候不需要

> 有一天把模块发布了 别人会安装你的发布的模块，如果你的模块被别人安装，你的模块中的dependencies会默认一起呗下载,devDependencies不会下载的

sudo npm cache clean --force

常见的依赖项
dependcies
devDepencies
npm install --production 可以只安装dependcies


peerDependencies  会提示你安装缺少的模块 默认要求带版本
