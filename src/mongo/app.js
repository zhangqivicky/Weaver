module.exports = function(app){
  var db = require("./models/models.server");
  var passport = require("passport");
  require("./services/user.service.server.js")(app);
  require("./services/event.service.server.js")(app);
}
