var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  creator: {type: mongoose.Schema.ObjectId, ref:"UserModel"},
  attendees: String,
  collectors: [{type: mongoose.Schema.ObjectId, ref:"UserModel"}],
  dateCreated: {type: Date, default: Date.now}
}, {collections: 'event'});

module.exports = eventSchema;
