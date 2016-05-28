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

            for(var i in users) {
                if (users[i]._id === id) {
                    vm.user = angular.copy(users[i])    ;
                    index = i;
                }
            }

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