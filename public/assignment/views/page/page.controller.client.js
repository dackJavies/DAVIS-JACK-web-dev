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
            vm.page = PageService.findPageById(vm.pageId);

        }

        init();

        function applyChanges() {

            PageService.updatePage(vm.pageId, vm.page);

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");

        }

        function deletePage() {

            PageService.deletePage(vm.pageId);

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");

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

            vm.pages = PageService.findPagesByWebsiteId(wid);
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

            var toAdd = {_id: 0, name: newName, websiteId: vm.webId};

            PageService.createPage(vm.webId, toAdd);

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");

        }

    }

})();