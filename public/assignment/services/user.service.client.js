(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {

            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByID: findUserByID,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername
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
         * @returns {*} The new user
         */
        function createUser(user) {

            var url = "/api/user";
            return $http.post(user, url);

        }

        /**
         * Find a User given their credentials
         *
         * @param username The User's username
         * @param password The User's password
         * @returns {*} The correct User if the credentials match one. Otherwise, returns null.
         */
        function findUserByCredentials(username, password) {

            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        /**
         * Find a User given their credentials
         *
         * @param id The id to search for
         * @returns {*} The correct User if the ID matches one. Otherwise, returns null.
         */
        function findUserByID(id) {

            var url = "/api/user/" + id;
            return $http.get(url);

        }

        /**
         * Update a User based on their ID
         *
         * @param id The ID to look for
         * @param newUser The data to copy over to the existing User
         * @returns {boolean} Whether the update was successful or not
         */
        function updateUser(id, newUser) {

            var url = "/api/user/" + id;
            return $http.put(url, newUser);

        }

        /**
         * Delete a user based on the id
         *
         * @param id The id of the User to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deleteUser(id) {

            var url = "/api/user/" + id;
            return $http.delete(url);

        }

        /**
         * Find a user by their username
         *
         * @param username The username of the desired user
         * @returns {*} The user if found, or an empty object if not
         */
        function findUserByUsername(username) {

            var url = "/api/user?username=" + username;
            return $http.get(url);

        }

    }

})();