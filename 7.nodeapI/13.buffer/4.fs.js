const fs = require("fs");

// 读取一点 写一点，不会导致淹没可用内存
const SIZE = 5;
let buffer = Buffer.alloc(SIZE);
fs.open("./note.md", "r", function(err, rfd) {
  // number
  fs.open("./copy.md", "w", function(err, wfd) {
    let readOffset = 0;
    let writeOffset = 0;
    // co
    function next() {
      fs.read(rfd, buffer, 0, SIZE, readOffset, function(err, bytesRead) {
        if(bytesRead === 0){
            fs.close(wfd,()=>{})
            return fs.close(rfd,()=>{});
        }
        fs.write(wfd, buffer, 0, bytesRead, writeOffset, function() {
            readOffset += bytesRead;
            writeOffset += bytesRead;
            next();
        });
      });
    }
    next();
  });
});
