(function() {
    angular
        .module("SearchScape")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController(UserService, $rootScope, $location) {

        var vm = this;

        vm.login = login;

        function login(username, password) {

            if (username && password) {

                vm.error = vm.usernameErr = vm.passwordErr = null;

                var toLogin = {
                    username: username,
                    password: password
                };

                UserService
                    .login(toLogin)
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

                vm.error = "Missing info.";

                // Handle username error
                if (!username) {
                    vm.usernameErr = "Username required.";
                } else {
                    vm.usernameErr = null;
                }

                // Handle password error
                if (!password) {
                    vm.passwordErr = "Password required.";
                } else {
                    vm.passwordErr = null;
                }

            }

        }

    }

    function ProfileController(UserService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.update = update;
        vm.logout = logout;

        function init() {

            vm.userId = $routeParams["uid"];

            if (!vm.userId) {
                vm.userId = $rootScope.currentUser._id;
            }

            UserService
                .findUserById(vm.userId)
                .then(
                    function(succ) {
                        vm.user = succ.data;
                    },
                    function(err) {
                        vm.error = "Could not load profile info.";
                    }
                );

        }

        init();

        function update() {

            UserService
                .updateUser(vm.userId, vm.user)
                .then(
                    function(succ) {
                        vm.success = "Successfully update profile.";
                    },
                    function(err) {
                        vm.error = "Could not update profile.";
                    }
                );

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function (err) {
                        vm.error = "Could not log out.";
                    }
                );
        }

    }

    function RegisterController(UserService, $rootScope, $location) {

        var vm = this;

        vm.register = register;

        function register(fname, lname, uname, pass, vpass) {

            if (uname && pass && vpass && pass === vpass) {

                vm.error = vm.usernameErr = vm.passwordErr = vm.vpasswordErr = vm.matchErr = null;

                var user = {
                    username: uname,
                    password: pass,
                    firstName: fname,
                    lastName: lname
                };

                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var newUser = response.data;
                            $rootScope.currentUser = newUser;
                            $location.url("/user/"+newUser._id);
                        },
                        function(err) {
                            vm.error = "Could not register. Username may be taken.";
                        }
                    );

            } else {

                vm.error = "Missing information.";

                if (!uname) {
                    vm.usernameErr = "Username required.";
                } else {
                    vm.usernameErr = null;
                }

                if (!pass) {
                    vm.passwordErr = "Password required.";
                } else {
                    vm.passwordErr = null;
                }

                if (!vpass) {
                    vm.vpasswordErr = "Must verify password.";
                } else {
                    vm.vpasswordErr = null;
                }

                if (pass && vpass && !(pass === vpass)) {
                    vm.matchErr = "Passwords do not match.";
                } else {
                    vm.matchErr = null;
                }

            }

        }

    }

})();