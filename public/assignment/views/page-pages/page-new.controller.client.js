(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {

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