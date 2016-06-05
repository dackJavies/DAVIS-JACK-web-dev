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

            PageService
                .updatePage(vm.pageId, vm.page)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

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
         * @param newName The name of the new website
         */
        function addPage(newName) {

            var toAdd = {_id: "0", name: newName + "", websiteId: vm.webId + ""};

            PageService
                .createPage(vm.webId, toAdd)
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

})();