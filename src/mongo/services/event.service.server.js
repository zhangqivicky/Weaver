var userModel = require('../models/user/user.model.server');
var eventModel = require('../models/event/event.model.server');

module.exports = function(app) {
  app.post("/api/user/:userId/event", createEvent);
  app.get("/api/user/:userId/postevent", findPostEventsByUser);
  app.get("/api/user/:userId/goingevent", findGoingEventsByUser);
  app.get("/api/user/:userId/savedevent", findSavedEventsByUser);
  app.get("/api/event/:eventId", findEventById);
  app.put("/api/event/:eventId", updateEvent);
  app.delete("/api/event/:eventId", deleteEvent);
  app.get("/api/event", findAllEvents);


  function createEvent(req, res) {
    var userId = req.params['userId'];
    var newEvent = JSON.parse(Object.keys(req.body)[0]);
    eventModel.createEventForUser(userId,newEvent)
      .then(function(event) {
        res.json(event);
      });
  }

  function findEventById(req, res) {
    var eventId = req.params['eventId'];
    eventModel.findEventById(eventId).then(function(event) {
      if (event) {
        res.json(event);
      } else {
        res.json({});
      }
    });
  }

  function findPostEventsByUser(req, res) {
    var userId = req.params['userId'];
    eventModel.findPostEventsByUser(userId).then(function(postevents) {
      res.json(postevents);
    })
  }

  function findGoingEventsByUser(req, res) {
    var userId = req.params['userId'];
    var postId = userModel.findUserById(userId).select('goingevents');
    var goingevents = [];
    for(var i = 0; i < postId.length; i++) {
      goingevents.push(eventModel.findEventById(postId[i]));
    }
    res.json(goingevents);
  }

  function findSavedEventsByUser(req, res) {
    var userId = req.params['userId'];
    var postId = userModel.findUserById(userId).select('savedevents');
    var savedevents = [];
    for(var i = 0; i < postId.length; i++) {
      savedevents.push(eventModel.findEventById(postId[i]));
    }
    res.json(savedevents);
  }

  function updateEvent(req, res) {
    var eventId = req.params['eventId'];
    var event = JSON.parse(Object.keys(req.body));

    eventModel.updateEvent(eventId, event).then(function(status) {
      res.send(status);
    });
  }


  function deleteEvent(req, res) {
    var eventId = req.params['eventId'];
    eventModel.deleteEvent(eventId).then(function(status) {
      res.send(status);
    });
  }

  function findAllEvents(req, res){
    eventModel.findAllEvents().then(function(events){
      res.json(events);
    });
  }
}
