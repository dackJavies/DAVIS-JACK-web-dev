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
            var user = UserService.findUserByCredentials(username, password);

            if(user) {
                var id = user._id;
                $location.url("/user/" + id);
            } else {
                vm.error = "User not found";
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

            vm.user = UserService.findUserByID(id);

        }

        init();

        /**
         * Update the current user
         */
        function updateUser() {

            var result = UserService.updateUser(vm.user._id, vm.user);

            if (result === true) {
                vm.success = "Updated sucessfully.";
            } else {
                vm.error = "Could not find that User.";
            }

        }

    }

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;

        function register(uname, pass, vpass, fname, lname) {

            if (!UserService.alreadyHas(uname) && pass == vpass) {

                var user = {_id: 0, username: uname, password: pass, firstName: fname, lastName: lname};
                UserService.createUser(user);
                $location.url("/profile/" + user._id);

            } else {
                vm.error = "Username is already taken, or passwords do not match. Try again."
            }

        }

    }

})();