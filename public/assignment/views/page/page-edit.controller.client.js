// (function() {
//     angular
//         .module("WebAppMaker")
//         .controller("PageEditController", PageEditController);
//
//
//     function PageEditController($routeParams, PageService, $location) {
//
//         var vm = this;
//
//         vm.userId = null;
//         vm.webId = null;
//         vm.pageId = null;
//         vm.page = null;
//        
//         vm.applyChanges = applyChanges;
//         vm.deletePage = deletePage;
//
//         function init() {
//
//             vm.userId = $routeParams["uid"];
//             vm.webId = $routeParams["wid"];
//             vm.pageId = $routeParams["pid"];
//             vm.page = PageService.findPageById(vm.pageId);
//
//         }
//
//         init();
//
//         function applyChanges() {
//
//             PageService.updatePage(vm.pageId, vm.page);
//
//             $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
//
//         }
//
//         function deletePage() {
//
//             PageService.deletePage(vm.pageId);
//
//             $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
//
//         }
//
//     }
//
// })();