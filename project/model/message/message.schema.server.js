module.exports = function() {

    var mongoose = require("mongoose");

    var MessageSchema = mongoose.Schema({

        author: {type: mongoose.Schema.Types.ObjectId, ref: "projectUser"},
        recipient: {type: mongoose.Schema.Types.ObjectId, ref: "projectUser"},
        text: String,
        date: Date

    }, {collection: "message"});

    return MessageSchema;

};