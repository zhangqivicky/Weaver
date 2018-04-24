

var userModel = require("../models/user/user.model.server");
var passport = require('passport');

module.exports = function(app) {

  var bcrypt = require("bcrypt-nodejs");
  var LocalStrategy = require('passport-local').Strategy;
  passport.use('local', new LocalStrategy(localStrategy));

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedin', loggedin);
  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  function localStrategy(email, password, done) {
    userModel.findUserByEmail(email).then(
      function(user) {
        if(user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }, function(err) {
        if(err) { return done(err);}
      }
    )
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel.findUserById(user._id).then(
      function(user) { done(null, user);
      }, function(err) { done(err, null);
      });
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user).then(function (user) {
      if (user) {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  }

  function login(req, res) {
    console.log('req.user :' + JSON.stringify(req.user));
    res.json(req.user);
  }

  function logout(req, res) {
    req.logOut();
    res.status(200).send();
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated()? req.user : '0');
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user).then(function(user) {
      res.json(user);
    });
  }
  function findUsers(req, res) {
    var email = req.query['email'];
    var password = req.query['password'];
    if(email && password) {
      userModel.findUserByCredentials(email, password).then(function(user) {
        res.json(user);
      });
      return;
    } else if(email) {
      userModel.findUserByEmail(email).then(function(user) {
        res.json(user);
      });
      return;
    }
    res.json({});
  }


  function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId).then(function(user) {
      res.json(user);
    });
  }


  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    userModel.updateUser(userId, user).then(function(status) {
      res.send(status);
    });
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel.deleteUser(userId).then(function (status) {
      res.send(status);
    })
  }

function uploadImage(req, res) {
    //require multer for the file uploads
    var multer = require('multer');
    // set the directory for the uploads to the uploaded to
    var DIR = '../../assets/images';
    var upload = multer({dest: DIR}).single('photo');
    var path = '';
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      // No error occured.
      path = req.file.path;

      return res.send("Upload Completed for "+path);
    });
  }
}
