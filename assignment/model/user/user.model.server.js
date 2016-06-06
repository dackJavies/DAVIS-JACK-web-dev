module.exports = function() {

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser

    };

    return api;

    /**
     * Creates a new user instance
     *
     * @param user The user to be added
     */
    function createUser(user) {

        

    }

    /**
     * Retrieves a user instance whose _id is equal to parameter userId
     *
     * @param userId The id of the user to be found
     */
    function findUserById(userId) {



    }

    /**
     * Retrieves a user instance whose username is equal to parameter username
     *
     * @param username The username of the user to be found
     */
    function findUserByUsername(username) {



    }

    /**
     * Retrieves a user instance whose username and password are equal to parameters userId and password
     *
     * @param username The username of the user to be found
     * @param password The password of the user to be found
     */
    function findUserByCredentials(username, password) {



    }

    /**
     * Updates user instance whose _id is equal to parameter userId
     *
     * @param userId The id of the user to be updated
     * @param user The information to update that user to
     */
    function updateUser(userId, user) {



    }

    /**
     * Removes user instance whose _id is equal to parameter userId
     *
     * @param userId The id of the user to be deleted
     */
    function deleteUser(userId) {



    }

};