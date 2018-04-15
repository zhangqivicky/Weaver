// server.js
var express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/dist/')));
 app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   next();
 });
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

//require("./assignment/app.js")(app);
require("./src/mongo/app.js")(app);

server.listen(port);



// Run the app by serving the static files
// in the dist directory
//app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port




