(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $rootScope, UserService) {

        var vm = this;

        vm.login = login;
        vm.logout = logout;

        function login(username, password) {

            if (username && password) {

                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        },
                        function(error) {
                            vm.error = "Incorrect credentials. Try again.";
                            vm.usernameErr = null;
                            vm.passwordErr = null;
                        }
                    );
            } else {
                vm.error = "Missing information.";

                if (!username) {
                    vm.usernameErr = "Username required.";
                } else {
                    vm.usernameErr = null;
                }

                if (!password) {
                    vm.passwordErr = "Password required.";
                } else {
                    vm.passwordErr = null;
                }

            }

        }

        function logout() {

            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                )

        }

    }

    function ProfileController($routeParams, $rootScope, UserService) {

        var vm = this;

        // Event handlers
        vm.updateUser = updateUser;

        var id = $routeParams["uid"];

        if (!id) {
            id = $rootScope.currentUser._id;
        }

        function init() {

            UserService
                .findUserByID(id)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

        init();

        /**
         * Update the current user
         */
        function updateUser() {

            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function(response) {
                        vm.success = "Updated successfully.";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

    }

    function RegisterController($location, $rootScope, UserService) {

        var vm = this;

        vm.register = register;

        function register(uname, pass, vpass, fname, lname) {


            if ((uname && pass && vpass) && pass === vpass) {

                var user = {username: uname, password: pass, firstName: fname, lastName: lname};

                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var myUser = response.data;
                            $rootScope.currentUser = myUser;
                            $location.url("/user/" + myUser._id);
                        },
                        function (error) {
                            vm.error = "Could not register. Username may already be taken.";
                        }
                    );
            } else {
                vm.error = "Missing info.";

                if (!uname) {
                    vm.usernameErr = "Must have a username.";
                } else {
                    vm.usernameErr = null;
                }

                if (!pass) {
                    vm.passwordErr = "Must have a password.";
                } else {
                    vm.passwordErr = null;
                }

                if (!vpass) {
                    vm.vpasswordErr = "Must verify password.";
                } else {
                    vm.vpasswordErr = null;
                }

                if (!(pass == vpass)) {
                    vm.matchErr = "Passwords do not match.";
                } else {
                    vm.matchErr = null;
                }
            }

        }

    }

})();