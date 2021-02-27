'use strict';
let http = require('http');
let nodeStatic = require('node-static');
let file = new nodeStatic.Server('.');

http.createServer((req,res)=>{file.serve(req,res);}).listen(8080);

console.log('Server running on port 8080');
