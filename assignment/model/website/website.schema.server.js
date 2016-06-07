module.exports = function() {

    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({

        _user: User,
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "Page"}],
        dateCreated: Date

    }, {collection: "website"});

    return WebsiteSchema;

};