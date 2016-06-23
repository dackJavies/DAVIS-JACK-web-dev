(function() {
    angular
        .module("SearchScape")
        .config(Config);

    function Config($routeProvider) {

        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };
        
        $routeProvider
            // User Pages
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            // Puzzle Pages
            .when("/user/:uid/puzzle/new", {
                templateUrl: "views/puzzle/new-puzzle.view.client.html",
                controller: "NewPuzzleController",
                controllerAs: "model"
            })
            .when("/user/:uid/puzzle", {
                templateUrl: "views/puzzle/puzzle-list.view.client.html",
                controller: "PuzzleListController",
                controllerAs: "model"
            })
            .when("/user/:uid/puzzle/:pid", {
                templateUrl: "views/puzzle/puzzle-solve.view.client.html",
                controller: "SolvePuzzleController",
                controllerAs: "model"
            })
            .when("/user/:uid/puzzle/:pid/comment", {
                templateUrl: "views/puzzle/puzzle-comments.view.client.html",
                controller: "PuzzleCommentController",
                controllerAs: "model"
            })
            // Friend Pages
            .when("/user/:uid/friend/new", {
                templateUrl: "views/friend/add-friend.view.client.html",
                controller: "NewFriendController",
                controllerAs: "model"
            })
            .when("/user/:uid/friend", {
                templateUrl: "views/friend/friend-list.view.client.html",
                controller: "FriendListController",
                controllerAs: "model"
            })
            .when("/user/:uid/friend/:fid", {
                templateUrl: "views/friend/friend-profile.view.client.html",
                controller: "FriendProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/friend/:fid/message", {
                templateUrl: "views/friend/message-friend.view.client.html",
                controller: "MessageFriendController",
                controllerAs: "model"
            });
        
    }

})();