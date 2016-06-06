module.exports = function() {

    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({

        _user: User,
        name: String,
        description: String,
        pages: [Page],
        dateCreated: Date

    }, {collection: "website"});

    return WebsiteSchema;

};