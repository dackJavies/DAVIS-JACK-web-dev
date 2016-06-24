module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var ProjectUser = mongoose.model("ProjectUser", UserSchema);

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllFriendsForUser: findAllFriendsForUser,
        addFriend: addFriend,
        removeFriend: removeFriend,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId

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

    function findAllFriendsForUser(userId) {

        return ProjectUser.findById(userId).then(
            function(succ) {
                return succ.friends;
            }
        );

    }

    function addFriend(userId, friendId) {

        return ProjectUser.update(
            {_id: userId},
            {$push: {friends: friendId}}
        );

    }

    function removeFriend(userId, friendId) {

        return ProjectUser.update(
            {_id: userId},
            {$pull: {friends: friendId}}
        );

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

    function findUserByGoogleId(profileId) {

        return ProjectUser.findOne({'google.id': profileId});

    }

};