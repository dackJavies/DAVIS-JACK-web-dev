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
            UserService
                .findUserByCredentials(username, password)
                .then(
                    function(response) {
                        var id = response.data._id;
                        $location.url("/user/" + id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

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

            if (pass === vpass) {

                UserService
                    .createUser(user)
                    .then(
                        function (response) {
                            var url = "/user/" + response.data._id;
                            $location.url(url);
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }

        }

    }

})();