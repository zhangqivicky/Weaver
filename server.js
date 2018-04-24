// server.js
var express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


app.use(cookieParser());
app.use(session({ secret: 'session-secret' }));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/dist/')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // when deploy to heroku, you just need to input *
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

require("./src/mongo/app.js")(app);

server.listen(port);



// Run the app by serving the static files
// in the dist directory
//app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port




