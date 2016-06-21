(function() {
    angular
        .module("SearchScape")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {

            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser

        };

        return api;

        function login(user) {
            return $http.post("/projectapi/login", user);
        }

        function logout(user) {
            return $http.post("/projectapi/logout");
        }

        function register(user) {
            return $http.post("/projectapi/register", user);
        }

        function createUser(user) {

            var url = "/projectapi/user";
            return $http.post(url, user);

        }

        function findUserByCredentials(username, password) {

            var url = "/projectapi/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        function findUserByUsername(username) {

            var url = "/projectapi/user?username=" + username;
            return $http.get(url);

        }

        function findUserById(userId) {

            var url = "/projectapi/user/" + userId;
            return $http.get(url);

        }

        function updateUser(userId, user) {

            var url = "/projectapi/user/" + userId;
            return $http.put(url, user);

        }

        function deleteUser(userId) {

            var url = "/projectapi/user/" + userId;
            return $http.delete(url);

        }

    }

})();