(function() {
    angular
        .module("SearchScape")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController(UserService, $rootScope) {

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

    }

    function ProfileController(UserService) {



    }

    function RegisterController(UserService) {



    }

})();