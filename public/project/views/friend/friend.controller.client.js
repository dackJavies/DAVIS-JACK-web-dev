(function() {
    angular
        .module("SearchScape")
        .controller("NewFriendController", NewFriendController)
        .controller("FriendListController", FriendListController)
        .controller("FriendProfileController", FriendProfileController)
        .controller("MessageFriendController", MessageFriendController);

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

    function FriendProfileController(UserService, $routeParams, PuzzleService, $location) {

        var vm = this;

        vm.addFriend = addFriend;
        vm.removeFriend = removeFriend;
        vm.deleteUser = deleteUser;
        vm.removePuzzle = removePuzzle;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.friendId = $routeParams["fid"];

            return UserService
                .findUserById(vm.friendId)
                .then(
                    function(succ) {
                        vm.friend = succ.data;
                        return UserService
                            .findUserById(vm.userId);

                    },
                    function(err) {
                        vm.error = "Could not load profile data.";
                    }
                )
                .then(
                    function(succ) {
                        vm.user = succ.data;
                        return PuzzleService.findAllPuzzlesForUser(vm.friend._id)
                    }
                )
                .then(
                    function(succ) {
                        vm.friendPuzzles = succ.data;
                    }
                );

        }

        init();

        function addFriend() {

            if (vm.user.friends.indexOf(vm.friendId) === -1) {

                UserService
                    .addFriend(vm.userId, vm.friendId)
                    .then(
                        function (succ) {
                            vm.success = "Added " + vm.friend.username + " as a friend.";
                        },
                        function (err) {
                            vm.error = "Could not add friend.";
                        }
                    );
            } else {
                vm.error = vm.friend.username + " is already a friend.";
            }

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

        function deleteUser() {

            // ADMIN FUNCTION ONLY
            UserService
                .deleteUser(vm.friendId)
                .then(
                    function(succ) {
                        $location.url("/user/" + vm.userId + "/friend");
                    },
                    function(err) {
                        vm.error = "Could not remove user.";
                    }
                );

        }

        function removePuzzle(puzzleId) {

            // ADMIN FUNCTION ONLY
            PuzzleService
                .deletePuzzle(puzzleId)
                .then(
                    function(succ) {
                        init();
                    },
                    function(err) {
                        vm.error = "Could not remove puzzle.";
                    }
                );


        }

    }
    
    function MessageFriendController(MessageService, $routeParams) {
        
        var vm = this;

        vm.sendMessage = sendMessage;
        vm.deleteMessage = deleteMessage;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.friendId = $routeParams["fid"];

            vm.messageText = "";

            MessageService
                .findAllMessagesForUsers(vm.userId, vm.friendId)
                .then(
                    function(succ) {
                        vm.messages = succ.data;
                    },
                    function(err) {
                        vm.error = "Could not retrieve messages.";
                    }
                );

        }

        return init();

        function sendMessage() {

            if (vm.messageText) {

                var message = {author: vm.userId, recipient: vm.friendId, text: vm.messageText, date: getTodayDate()};

                MessageService
                    .createMessage(message)
                    .then(
                        function(succ) {
                            init();         // Refresh, show new messages.
                        },
                        function(err) {
                            vm.error = "Could not send message.";
                        }
                    );

            } else {

                vm.error = "Need message body to send!";

            }

        }
        
        function deleteMessage(messageId) {
            
            MessageService
                .deleteMessage(messageId)
                .then(
                    function(succ) {
                        init();
                    },
                    function(err) {
                        vm.error = "Could not delete message.";
                    }
                );
            
        }

        // Ripped from: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
        function getTodayDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            today = mm+'/'+dd+'/'+yyyy;
            return today;
        }
        
    }

})();