var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByEmail = findUserByEmail;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;


module.exports = userModel;


function createUser(user) {
  console.log('mongo user' + JSON.stringify(user));
  return userModel.create(user);
}

function findUserById(userId) {
  return userModel.findById(userId, function(err, user) {
  });
}

function findUserByEmail(email) {
  console.log('mongo user' + email);
  //console.log( JSON.stringify(userModel.findOne({email: email})));
  return userModel.findOne({email: email});
}

function findUserByCredentials(email, password) {
  return userModel.findOne({email: email, password: password});
}

function updateUser(userId, user) {
  return userModel.update({_id: userId}, user);
}

function deleteUser(userId) {
  return userModel.remove({_id: userId});
}
