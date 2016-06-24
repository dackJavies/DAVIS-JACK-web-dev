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
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId

    };

    return api;

    /**
     * Creates a new user instance
     *
     * @param user The user to be added
     */
    function createUser(user) {

        return User.findOne({username: user.username}).then(
            function(resultUser) {
                if (!resultUser) {
                    return User.create(user);
                }
            }
        );

    }

    /**
     * Retrieves a user instance whose _id is equal to parameter userId
     *
     * @param userId The id of the user to be found
     */
    function findUserById(userId) {

        return User.findById(userId);

    }

    /**
     * Retrieves a user instance whose username is equal to parameter username
     *
     * @param username The username of the user to be found
     */
    function findUserByUsername(username) {

        return User.findOne({username: username});

    }

    /**
     * Retrieves a user instance whose username and password are equal to parameters userId and password
     *
     * @param username The username of the user to be found
     * @param password The password of the user to be found
     */
    function findUserByCredentials(username, password) {

        return User.findOne({username: username, password: password});

    }

    /**
     * Updates user instance whose _id is equal to parameter userId
     *
     * @param userId The id of the user to be updated
     * @param user The information to update that user to
     */
    function updateUser(userId, user) {

        return User.update(
            {_id: userId},
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                websites: user.websites
            }
        );

    }

    /**
     * Removes user instance whose _id is equal to parameter userId
     *
     * @param userId The id of the user to be deleted
     */
    function deleteUser(userId) {

        return User.remove({_id: userId});

    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id' : facebookId});
    }

};