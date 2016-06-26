module.exports = function() {

    var mongoose = require("mongoose");

    var ProjectUserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        friends: [{type: mongoose.Schema.Types.ObjectId, ref: "projectUser"}],
        google: {
            id: String,
            token: String
        },
        isAdmin: Boolean

    }, {collection: "projectUser"});

    return ProjectUserSchema;

};