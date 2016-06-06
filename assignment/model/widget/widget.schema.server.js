module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({

        _page: page,
        type: String, //enum???
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: Number,
        height: Number,
        rows: size,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: Date

    }, {collection: "widget"});

    return WidgetSchema;

};