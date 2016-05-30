// (function() {
//     angular
//         .module("WebAppMaker")
//         .controller("WebsiteNewController", WebsiteNewController);
//
//     function WebsiteNewController($routeParams, WebsiteService, $location) {
//
//         var vm = this;
//
//         vm.userId = $routeParams["uid"];
//
//         vm.addWebsite = addWebsite;
//
//         function addWebsite(newName) {
//
//             var toAdd = {_id: 0, name: newName, developerId: vm.userId};
//             WebsiteService.createWebsite(vm.userId, toAdd);
//             $location.url("/user/" + vm.userId + "/website");
//
//         }
//
//     }
//
// })();