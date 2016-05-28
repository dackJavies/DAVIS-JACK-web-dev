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
            findUserByCredentials: findUserByCredentials

        };
        return api;

        function createUser() {

        }

        /**
         * Find a User given their credentials
         *
         * @param username The User's username
         * @param password The User's password
         * @returns The correct User if the credentials match one. Otherwise, returns null.
         */
        function findUserByCredentials(username, password) {

            for(var i in users) {

                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }

            }

            return null;

        }

    }

})();