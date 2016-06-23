module.exports = function(app) {

    var models = require("./model/models.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/puzzle.service.server.js")(app, models);
    require("./services/message.service.server.js")(app,models);
    require("./services/comment.service.server.js")(app, models);
};