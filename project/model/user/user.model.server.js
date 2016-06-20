module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser

    };

    return api;

    function createUser(user) {

        return User.findOne({username: user.username}).then(
            function(succ) {
                if (!succ) {
                    return User.create(user);
                }
            }
        );

    }

    function findUserById(userId) {

        return User.findById(userId);

    }

    function findUserByUsername(username) {

        return User.findOne({username: username});

    }

    function findUserByCredentials(username, password) {

        return User.findOne({username: username, password: password});

    }

    function updateUser(userId, user) {

        return User.update({_id: userId}, {

            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName

        });

    }

    function deleteUser(userId) {

        return User.remove({_id: userId});

    }

};