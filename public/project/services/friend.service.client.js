(function() {
    angular
        .module("SearchScape")
        .factory("FriendService", FriendService);

    function FriendService($http) {

        var api = {

            findFriendById: findFriendById,
            findFriendByUsername: findFriendByUsername,
            deleteFriend: deleteFriend

        };

        return api;

        function findFriendById(friendId) {

            var url = "/api/friend/" + friendId;
            return $http.get(url);

        }

        function findFriendByUsername(username) {

            var url = "/api/friend?username=" + username;
            return $http.get(url);

        }

        function deleteFriend(friendId) {

            var url = "/api/friend/" + friendId;
            return $http.delete(url);

        }

    }

})();