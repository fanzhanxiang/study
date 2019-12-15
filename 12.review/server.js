const http = require('http');

http.createServer((req,res)=>{
    // script标签是支持跨域
    if(req.url === '/jsonp'){
        res.end(`fn({name:'zf'})`);
    }
}).listen(3000);