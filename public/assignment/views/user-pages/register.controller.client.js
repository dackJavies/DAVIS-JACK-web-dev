(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;
        
        function register(uname, pass, vpass, fname, lname) {

            if (!UserService.alreadyHas(uname) && pass == vpass) {

                var user = UserService.createUser(uname, pass, fname, lname);
                $location.url("/profile/" + user._id);

            } else {
                vm.error = "Username is already taken, or passwords do not match. Try again."
            }
            
        }

    }

})();