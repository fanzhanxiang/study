let http = require('http');
let uuid = require('uuid');
let querystring = require('querystring')
let cardName = 'tian';
let session = {}; // 存到内存中 数据库，数据挂了 问题就是持久化丢了 
let server = http.createServer((req,res)=>{
    let arr = [];
    res.setCookie = function(key,value,options={}){
        let opts = [];
        if(options.domain){
            opts.push(`domain=${options.domain}`)
        }
        if(options.maxAge){
            opts.push(`max-age=${options.maxAge}`)
        }
        if(options.httpOnly){
            opts.push(`httpOnly=${options.httpOnly}`)
        }
        if(options.signed){ // 加盐算法 
            value =  value + '.' + sign(value)
        }
        arr.push(`${key}=${value}; ${opts.join('; ')}`);
        res.setHeader('Set-Cookie',arr);
    }
    req.getCookie = function(key,options = {}){
        let obj = querystring.parse(req.headers.cookie,'; '); // a=b; c=d; www=xxx  a=b&c=d
        if(options.signed){
            let [value,s] = obj[key].split('.');
            let newSign = sign(value);
            if(s === newSign){
                return value;
            }else{
                return undefined;
            }
        }
        
        return obj[key];
    }
    if(req.url === '/wash'){
        let id = req.getCookie(cardName)
        if(id && session[id]){ // 有卡
            session[id].mny -=100;
            res.end('current money is # '+session[id].mny)
        }else{
            let cardId = uuid.v4();
            session[cardId] = {mny:500};
            res.setCookie(cardName,cardId);
            res.end('current money is # 500 ')
        }
    }
    res.end('Not Found')
}).listen(3000);

// jwt json web token (基于cookie原理)


// localStroage sessionStorage cookie session 区别
// localStroage 不能跨域 最多能存 5m 超过丢失 发请求的时候不会自动带上
// indexDB
// sessionStorage 浏览器关闭丢失
// cookie 在header上 每次请求自动带上 解决无状态的问题 最多4k 浪费流量
// session 基于cookie 存到服务器上

// 前后端分离 cookie 不支持
// ssr
// jwt express + cookie + session express 中间件 周六

// mongoose 2小时就能搞定 增删改查