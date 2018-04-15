var mongoose = require('mongoose');

//var db = mongoose.connect('mongodb://localhost/weaver');
var connectionString = 'mongodb://127.0.0.1:27017/weaver'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = 'zhangqivicky';//process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = 'neu123';//process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds155315.mlab.com:55315/heroku_vrmhpqzk'; // use yours
}

var db = mongoose.connect(connectionString,{useMongoClient: true});
module.exports = db;
