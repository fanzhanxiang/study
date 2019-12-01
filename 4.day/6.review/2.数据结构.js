// 队列 栈 链表 集合 hash表 树 图

// 1）队列 排队 先进先出
// class Queue{
//     constructor(){
//         this.queue = [];
//     }
//     enqueue(element){
//         this.queue.push(element);
//     }
//     dequeue(){
//         this.queue.shift();
//     }
// }
// let queue = new Queue();
// queue.enqueue(1)
// queue.enqueue(2)
// queue.dequeue()
// console.log(queue.queue);

// 栈的特点就是先进后出 代码执行的时候结构就是个栈 （执行上下销毁的时候 是从里向外的）
// 2）class Stack{
//     constructor(){
//         this.stack = [];
//     }
//     put(element){
//         this.stack.push(element);
//     }
//     pop(){
//         this.stack.pop();
//     }
// }
// let stack = new Stack();
// stack.put(1)
// stack.put(2)
// stack.pop()
// console.log(stack.stack);

// 链表 单向链表 双向链表  循环链表
// 操作数据 不需要破坏数据的原有结构 

// 3）class Node{ // 代表的是链表中的某一个节点
//     constructor(element){
//         this.element = element;
//         this.next = null;
//     }
// }
// class LinkList {
//     constructor(){
//         this.head = null;
//         this.length = 0;
//     }
//     insert(position,element){
//         let node = new Node(element);
//         if(!this.head){
//             this.head = node;
//         }else{
//             let index = 0;
//             let current = this.head;
//             let previous = null;
//             while(index++ < position){ // 找到要在谁之前插入那一项
//                 previous = current; // 那到要插入到哪项之前
//                 current = current.next; // 插入到前一个后面
//             }
//             previous.next = node;
//             node.next = current
//         }
//         this.length++;
//     }
//     append(element){
//         let node = new Node(element);
//         if(!this.head){
//             this.head = node;
//         }else{
//             let index = 0; // 从0向开始查找
//             let current = this.head; // 先把链表的头拿出来 开始查找
//             while(++index < this.length){
//                 current = current.next; // 如果当前不是最后一项就把这个人的下一项继续查找
//             }
//             current.next = node;
//         }
//         this.length++;
//     }
// }
// let ll = new LinkList();
// ll.append(1);
// ll.append(2);
// ll.append(3);
// ll.insert(1,100);
// // 实现删除 取值
// console.log(JSON.stringify(ll));


// 4) 集合 放置 不能重复的像 交集 并集 差集
// class Set{
//     constructor(){
//         this.set = {};
//     }
//     add(element){
//         if(!this.set.hasOwnProperty(element)){
//             this.set[element] = element;
//         }
//     }
// }
// let set = new Set(); // set的特点就是key value 相同
// set.add(1);
// set.add(1);
// console.log(set.set);

// 5)  hashTable取值快 而且es6 已经提供了
// class Map{ // 松散 重复的话可以在加上链表 
//     constructor(){
//         this.arr = [];
//     }
//     calc(key){
//         let total = 0;
//         for(let i = 0 ; i < key.length;i++){
//             total += key[i].charCodeAt()
//         }
//         return total % 100
//     }
//     set(key,value){
//         key = this.calc(key);
//         this.arr[key] = value
//     }
//     get(key){
//         key = this.calc(key);
//         return  this.arr[key];
//     }
// }
// 模拟hash表
// let map = new Map(); // hash 表
// map.set({a:1},123);
// map.set('bbq',456);
// console.log(map)


// 二叉树 二叉查找树  数据存储方式 小的放左边 大的放右边
// 树的遍历 
class Node {
    constructor(element){
        this.element = element;
        this.left = null;
        this.right = null
    }
}
class Tree{
    constructor(){
        this.root = null; // 树的根
    }
    insert(root,newNode){
        if(newNode.element < root.element){
            if(root.left == null){
                root.left = newNode
            }else{
                this.insert(root.left,newNode)
            }
        }else{
            if(root.right == null){
                root.right = newNode
            }else{
                this.insert(root.right,newNode)
            }
        }
    }
    add(element){
        let node = new Node(element);
        if(!this.root){
            this.root = node;
        }else{
            this.insert(this.root,node);
        }
    }
}
let tree = new Tree;
tree.add(100);
tree.add(60);
tree.add(150);
tree.add(50);
console.log(JSON.stringify(tree));


// 图  邻接表 (图 树直接的节点产生了关联就是图)

// 队列 栈 链表 树