function EventEmitter(){
    this._events = Object.create(null);
}
EventEmitter.prototype.on = function(eventName,callback){
    // 不管任何人 调用了on方法 都可以增肌_events
    if(!this._events) this._events = Object.create(null);
    // 监听绑定的事件 不是newLister就调用newListener
    if(eventName !== 'newListener'){
        this.emit('newListener',eventName);
    }

    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
}
EventEmitter.prototype.once = function(eventName,callback){
    // 绑定 执行后 删除
    let one = ()=>{ // 2） 会触发one函数
        callback();// 触发原有的逻辑
        // 删除自己
        this.off(eventName,one); // 在将one删除掉
    }
    one.l = callback; // 用自定义属性 保存原有的绑定函数
    this.on(eventName,one); // 1）  先绑定
}
EventEmitter.prototype.off = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(fn=>{
            return fn != callback && fn.l !== callback
        })
    }
}
// {'女生失恋':[fn1,fn2]}
EventEmitter.prototype.emit= function(eventName,...args){
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => fn(...args));
    }
}

module.exports = EventEmitter;
