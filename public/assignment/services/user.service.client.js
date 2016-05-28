(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {

            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByID: findUserByID,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;


        /**
         * Add a new User to the users array
         *
         * @param newid The new User's ID
         * @param newusername The new User's username
         * @param newpassword The new User's password
         * @param newfirstName The new User's first name
         * @param newlastName The new User's last name
         */
        function createUser(newid, newusername, newpassword, newfirstName, newlastName) {
            var toAdd = {_id: newid, username: newusername, password: newpassword,
                        firstName: newfirstName, lastName: newlastName};
            users.push(toAdd);
        }

        /**
         * Find a User given their credentials
         *
         * @param username The User's username
         * @param password The User's password
         * @returns {*} The correct User if the credentials match one. Otherwise, returns null.
         */
        function findUserByCredentials(username, password) {

            for(var i in users) {

                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }

            }

            return null;

        }

        /**
         * Find a User given their credentials
         *
         * @param id The id to search for
         * @returns {*} The correct User if the ID matches one. Otherwise, returns null.
         */
        function findUserByID(id) {

            for (var i in users) {

                if (users[i]._id === id) {

                    return users[i];

                }

            }

            return null;

        }

        /**
         * Update a User based on their ID
         *
         * @param id The ID to look for
         * @param newUser The data to copy over to the existing User
         * @returns {boolean} Whether the update was successful or not
         */
        function updateUser(id, newUser) {

            for(var i in users) {

                if (users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;                                // Successfully updated
                }

            }

            return false;                                       // Unable to find user

        }

        /**
         * Delete a user based on the id
         *
         * @param id The id of the User to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deleteUser(id) {

            var delIndex = -1;

            for(var i in users) {

                if (users[i]._id === id) {
                    delIndex = i;
                }

            }

            if (delIndex == -1) {
                return false;
            } else {
                users.splice(delIndex, 1);
                return true;
            }

        }

    }

})();