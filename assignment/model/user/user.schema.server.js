module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        // websites: [{type: mongoose.Schema.Types.ObjectId, ref: "Website"}],
        dateCreated: Date

    }, {collection: "user"});

    return UserSchema;

};