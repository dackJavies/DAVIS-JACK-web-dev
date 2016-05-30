(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {

        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.webId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {

            vm.website = WebsiteService.findWebsiteByID(vm.webId);

        }

        init();

        function updateWebsite() {

            var result = WebsiteService.updateWebsite(vm.website._id, vm.website);

            if (result == true) {
                vm.success = "Update successful.";
            } else {
                vm.error = "Could not update the page.";
            }

        }

        function deleteWebsite() {

            WebsiteService.deleteWebsite(vm.webId);

            $location.url("/user/" + vm.userId + "/website");

        }

    }

})();