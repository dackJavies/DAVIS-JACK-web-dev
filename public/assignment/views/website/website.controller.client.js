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

            WebsiteService
                .findWebsiteByID(vm.webId)
                .then(
                    function(response) {
                        vm.website = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

        init();

        function updateWebsite() {

            if (!(vm.website.name === "")) {

                var result = WebsiteService.updateWebsite(vm.website._id, vm.website);

                WebsiteService
                    .updateWebsite(vm.website._id, vm.website)
                    .then(
                        function (response) {
                            vm.success = "Update successful";
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "Name required.";
            }

        }

        function deleteWebsite() {

            WebsiteService
                .deleteWebsite(vm.webId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

    }

    function WebsiteListController($routeParams, WebsiteService) {

        var vm = this;

        vm.userId = $routeParams["uid"];

        // Event handlers

        function init() {

            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function(response) {
                        vm.websites = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

        init();


    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {

        var vm = this;

        vm.userId = $routeParams["uid"];

        vm.addWebsite = addWebsite;

        function addWebsite(newName, newDescription) {

            if (newName) {

                var toAdd = {_user: vm.userId, name: newName, description: newDescription};

                WebsiteService
                    .createWebsite(vm.userId, toAdd)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "Name required."
            }

        }

    }
    
})();