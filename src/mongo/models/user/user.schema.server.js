var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  displayname: String,
  password: String,
  firstName: String,
  lastName: String,
  username: String,
  imgsrc: String,
  postevents: {type: mongoose.Schema.Types.ObjectId, ref: "EventModel"},
  savedevents: {type: mongoose.Schema.Types.ObjectId, ref: "EventModel"},
  goingevents: {type: mongoose.Schema.Types.ObjectId, ref: "EventModel"},
  dateCreated: {type: Date, default: Date.now}
}, {collections: 'user'});


module.exports = userSchema;
