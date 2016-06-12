(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {

        var vm = this;

        vm.userId = null;
        vm.webId = null;
        vm.pageId = null;
        vm.page = null;

        vm.applyChanges = applyChanges;
        vm.deletePage = deletePage;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                        vm.page = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

        init();

        function applyChanges() {

            if (vm.page.name && !(vm.page.name == "")) {

                vm.error = null;
                vm.nameErr = null;

                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "Could not update page.";
                vm.nameErr = "Name required.";
            }

        }

        function deletePage() {

            PageService
                .deletePage(vm.pageId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

    }

    function PageListController($routeParams, PageService) {

        var vm = this;

        vm.webId = null;
        vm.userId = null;

        var uid = $routeParams["uid"];
        var wid = $routeParams["wid"];

        //Event Handlers

        function init() {

            PageService
                .findPagesByWebsiteId(wid)
                .then(
                    function(response) {
                        vm.pages = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            vm.userId = uid;
            vm.webId = wid;


        }
        init();



    }

    function NewPageController($routeParams, PageService, $location) {

        var vm = this;
        vm.addPage = addPage;

        vm.userId = null;
        vm.webId = null;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];

        }

        init();

        /**
         * Add the new page to the list
         *
         * @param newName The name of the new page
         * @param newPageDescription The description of the new page
         */
        function addPage(newName, newPageDescription) {

            if (newName && !(newName == "")) {

                vm.error = null;
                vm.nameErr = null;

                var toAdd = {_website: vm.webId + "", name: newName + "", description: newPageDescription + ""};

                PageService
                    .createPage(vm.webId, toAdd)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "Could not create page.";
                vm.nameErr = "Name required.";
            }

        }

    }

})();