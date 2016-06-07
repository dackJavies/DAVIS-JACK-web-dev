module.exports = function() {

    var mongoose = require("mongoose");

    var userModel = require("./user/user.model.server.js");
    var websiteModel = require("./website/website.model.server");
    var pageModel = require("./page/page.model.server");
    var widgetModel = require("./widget/widget.model.server");

    var models = {

        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel

    };

    return models;

};