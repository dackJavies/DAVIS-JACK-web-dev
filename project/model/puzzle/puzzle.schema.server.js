module.exports = function() {

    var mongoose = require("mongoose");

    var PuzzleSchema = mongoose.Schema({

        name: String,
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        contents: [String]

    });

    return PuzzleSchema;

};