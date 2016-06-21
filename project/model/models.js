module.exports = function() {

    var mongoose = require("mongoose");

    var userModel = require("./user/user.model.server.js")();
    var puzzleModel = require("./puzzle/puzzle.model.server")();
    // var pageModel = require("./friend/friend.model.server")();

    var connectionString = 'mongodb://127.0.0.1:27017/projectJackDavis';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.connect(connectionString);

    var models = {

        userModel: userModel,
        puzzleModel: puzzleModel

    };

    return models;

};