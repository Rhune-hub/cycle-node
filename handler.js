var fs = require('fs');


app.post("handler.js", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body} - ${request.body}`);
});

const { runInNewContext } = require('vm');
fs.readFile(file,{encoding: 'utf8'},function(err,data) {

  var string = JSON.stringify(users,null,'\t');

  fs.writeFile(file,string,function(err) {
    if(err) return console.error(err);
    console.log('done');
  })  
})