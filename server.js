/**
 * Main app file 
 */
'use strict';

//Add modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Add routes controller
const routes = require('./routes/routes.js')(app, fs);

//Start server
const server = app.listen(3000, () => {
  console.log('Listening on port %s...', server.address().port);
});