module.exports = function() {

    var mongoose = require("mongoose");

    var ProjectUserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String

    }, {collection: "projectUser"});

    return ProjectUserSchema;

};