// (function() {
//     angular
//         .module("WebAppMaker")
//         .controller("PageListController", PageListController);
//
//     function PageListController($routeParams, PageService) {
//
//         var vm = this;
//
//         vm.webId = null;
//         vm.userId = null;
//
//         var uid = $routeParams["uid"];
//         var wid = $routeParams["wid"];
//
//         //Event Handlers
//
//         function init() {
//
//             vm.pages = PageService.findPagesByWebsiteId(wid);
//             vm.userId = uid;
//             vm.webId = wid;
//
//
//         }
//         init();
//        
//        
//
//     }
//
// })();