module.exports = function() {

    var mongoose = require("mongoose");

    var CommentSchema = mongoose.Schema({

        author: {type: mongoose.Schema.Types.ObjectId, ref: "projectUser"},
        _puzzle: {type: mongoose.Schema.Types.ObjectId, ref: "puzzle"},
        text: String,
        date: Date

    }, {collection: "comment"});

    return CommentSchema;

};