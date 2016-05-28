(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService) {

        var vm = this;

        // Event handlers
        vm.updateUser = updateUser;

        var id = $routeParams["id"];
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

})();