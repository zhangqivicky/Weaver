var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  imgsrc: String,
  postevents: {type: mongoose.Schema.Types.ObjectId, ref: "EventModel"},
  savedevents: {type: mongoose.Schema.Types.ObjectId, ref: "EventModel"},
  goingevents: {type: mongoose.Schema.Types.ObjectId, ref: "EventModel"},
  dateCreated: {type: Date, default: Date.now}
}, {collections: 'user'});


module.exports = userSchema;
