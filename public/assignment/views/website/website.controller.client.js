(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {

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

    function WebsiteListController($routeParams, WebsiteService) {

        var vm = this;

        vm.userId = $routeParams["uid"];

        // Event handlers

        function init() {

            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        }

        init();


    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {

        var vm = this;

        vm.userId = $routeParams["uid"];

        vm.addWebsite = addWebsite;

        function addWebsite(newName) {

            var toAdd = {_id: 0, name: newName, developerId: vm.userId};
            WebsiteService.createWebsite(vm.userId, toAdd);
            $location.url("/user/" + vm.userId + "/website");

        }

    }
    
})();