(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {

        var vm = this;

        vm.login = login;

        function login(username, password) {

            if (username && password) {
                UserService
                    .findUserByCredentials(username, password)
                    .then(
                        function (response) {
                            var id = response.data._id;
                            $location.url("/user/" + id);
                        },
                        function (error) {
                            vm.error = "Could not login.";
                        }
                    );
            } else {
                vm.error = "Must have username and password";

                if (!username) {
                    vm.usernameErr = "Must have a username.";
                } else {
                    vm.usernameErr = null;
                }

                if (!password) {
                    vm.passwordErr = "Must have a password.";
                } else {
                    vm.passwordErr = null;
                }
            }

        }
    }

    function ProfileController($routeParams, UserService) {

        var vm = this;

        // Event handlers
        vm.updateUser = updateUser;

        var id = $routeParams["uid"];
        var index = -1;

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

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;

        function register(uname, pass, vpass, fname, lname) {


            var user = {username: uname, password: pass, firstName: fname, lastName: lname};

            if ((uname && pass && vpass) && pass === vpass) {

                UserService
                    .createUser(user)
                    .then(
                        function (response) {
                            var url = "/user/" + response.data._id;
                            $location.url(url);
                        },
                        function (error) {
                            vm.error = "Username already taken.";
                        }
                    );
            } else {
                vm.error = "Could not register.";

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

                if (!fname) {
                    vm.firstNameErr = "Must have a first name.";
                } else {
                    vm.firstNameErr = null;
                }

                if (!lname) {
                    vm.lastNameErr = "Must have a last name.";
                } else {
                    vm.lastNameErr = null;
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