'use strict';
let http = require('http');
let nodeStatic = require('node-static');
let file = new nodeStatic.Server('.');

http.createServer((req,res)=>{file.serve(req,res);}).listen(8080);

console.log('Server running on port 8080');

const express = require("express");
  
const app = express();
app.post("/save", jsonParser, function (request, response) {
  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
   
  response.json(request.body); // отправляем пришедший ответ обратно
});

function sendRes(url,contentType,res) {
  let file = path.join(__dirname+'/data/',url);
  fs.readFile(file,(err,content) => {
    if (err) {
      res.writeHead(404);
      res.write('File not found');
      res.end();
      console.error(`Error 404 ${file}`);
    }
    else {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(content);
      res.end();
    }
  })
}