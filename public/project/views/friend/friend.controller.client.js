(function() {
    angular
        .module("SearchScape")
        .controller("NewFriendController", NewFriendController)
        .controller("FriendListController", FriendListController)
        .controller("FriendProfileController", FriendProfileController);

    function NewFriendController(UserService, $routeParams) {

        var vm = this;

        vm.search = search;

        function init() {

            vm.userId = $routeParams["uid"];

        }

        init();

        function search(request) {

            if (request) {

                UserService
                    .findUserByUsername(request)
                    .then(
                        function (succ) {
                            vm.error = null;
                            vm.results = succ.data;
                        },
                        function (err) {
                            vm.error = "Did not find a user with that username.";
                        }
                    );
            } else {

                vm.error = "Must have a search term.";

            }

        }

    }

    function FriendListController(UserService, $routeParams) {

        var vm = this;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.friends = [];

            UserService
                .findAllFriendsForUser(vm.userId)
                .then(
                    function(succ) {
                        vm.friendIds = succ.data;
                        initHelper(0);
                    },
                    function(err) {
                        vm.error = "Could not retrieve friend list.";
                    }
                );
        }

        init();

        function initHelper(index) {

            if (index < vm.friendIds.length) {

                UserService
                    .findUserById(vm.friendIds[index])
                    .then(
                        function(succ) {
                            vm.friends.push(succ.data);
                            initHelper(index+1);
                        }
                    );

            }

        }

    }

    function FriendProfileController(UserService, $routeParams) {

        var vm = this;

        vm.addFriend = addFriend;
        vm.removeFriend = removeFriend;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.friendId = $routeParams["fid"];

            UserService
                .findUserById(vm.friendId)
                .then(
                    function(succ) {
                        vm.friend = succ.data;
                    },
                    function(err) {
                        vm.error = "Could not load profile data.";
                    }
                );

        }

        init();

        function addFriend() {

            UserService
                .addFriend(vm.userId, vm.friendId)
                .then(
                    function(succ) {
                        vm.success = "Added " + vm.friend.username + " as a friend.";
                    },
                    function(err) {
                        vm.error = "Could not add friend.";
                    }
                );

        }

        function removeFriend() {

            UserService
                .removeFriend(vm.userId, vm.friendId)
                .then(
                    function(succ) {
                        vm.success = "Removed " + vm.friend.username + " as a friend.";
                    },
                    function(err) {
                        vm.error = "Failed to remove friend.";
                    }
                );

        }

    }

})();