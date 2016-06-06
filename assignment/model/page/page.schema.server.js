module.exports = function() {

    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({

        _website: Website,
        name: String,
        description: String,
        widgets: [Widget],
        dateCreated: Date

    }, {collection: "page"});

    return PageSchema;

};