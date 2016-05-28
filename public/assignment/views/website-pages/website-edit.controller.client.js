(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService) {

        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.webId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;

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

    }

})();