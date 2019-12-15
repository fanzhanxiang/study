// 基本的设置cookie和获取cookie

const http = require('http');
const querystring = require('querystring');
const sign = (value)=>{
    // + / = 浏览器不支持
    return require('crypto').createHmac('sha256','zf').update(value).digest('base64').replace(/\/|\+|\=/g,'');
}
http.createServer((req,res)=>{
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
    if(req.url === '/write'){
        // 服务端 不能跨域设置cookie 可以给子域设置
        // www.baidu.com  
        // music.baidu.com
        // domain 限制某个域可以访问
        // path在哪个路径下可以访问cookie 以path开头的都能访问到 一般不设置 
        // expires、max-age 过期时间 缓存 如果做一些电商网站 (续命)
        // httpOnly 只能服务器操作

        // 客户端能村改cookie 仿造请求
        // res.setHeader('Set-Cookie',['name=zf; domain=.zhufeng.cn; max-age=10; httpOnly=true',`age=10`]);
        res.setCookie('name','zf',{domain:'.zhufeng.cn'});
        res.setCookie('age','10',{httpOnly:true});
        res.end('write ok');
        return 
    }
    if(req.url == '/visit'){
        // signed:true 表示 签名  不被用户所篡改
        let visit = req.getCookie('visit',{signed:true});
        if(visit){
            visit = visit-0+1;
            res.setCookie('visit',visit+'',{httpOnly:false,signed:true});
        }else{
            visit = 1
            res.setCookie('visit','1',{httpOnly:true,signed:true});
        }
        res.end(`当前第${visit}次访问`)
    }
    if(req.url === '/read'){
        res.end(req.getCookie('name') || '空');
    }
    
}).listen(3000);