module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var ProjectUser = mongoose.model("ProjectUser", UserSchema);

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

        return ProjectUser.findOne({username: user.username}).then(
            function(succ) {
                if (!succ) {
                    return ProjectUser.create(user);
                }
            }
        );

    }

    function findUserById(userId) {

        return ProjectUser.findById(userId);

    }

    function findUserByUsername(username) {

        return ProjectUser.findOne({username: username});

    }

    function findUserByCredentials(username, password) {

        return ProjectUser.findOne({username: username, password: password});

    }

    function updateUser(userId, user) {

        return ProjectUser.update({_id: userId}, {

            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName

        });

    }

    function deleteUser(userId) {

        return ProjectUser.remove({_id: userId});

    }

};