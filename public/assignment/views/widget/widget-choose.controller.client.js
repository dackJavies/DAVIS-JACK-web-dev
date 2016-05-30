// (function() {
//     angular
//         .module("WebAppMaker")
//         .controller("WidgetChooseController", WidgetChooseController);
//
//     function WidgetChooseController($routeParams, WidgetService, $location) {
//
//         var vm = this;
//
//         vm.userId = vm.webId = vm.pageId = null;
//
//         vm.makeHeader = makeHeader;
//         vm.makeImage = makeImage;
//         vm.makeYoutube = makeYoutube;
//         vm.navigate = navigate;
//
//         function init() {
//
//             vm.userId = $routeParams["uid"];
//             vm.webId = $routeParams["wid"];
//             vm.pageId = $routeParams["pid"];
//
//         }
//
//         init();
//
//         /**
//          * Make a Header widget and navigate to the edit page for it
//          */
//         function makeHeader() {
//
//             var toAdd = {_id: 0, widgetType: "HEADER", pageId: vm.pageId, size: 1, text: ""};
//
//             navigate(toAdd);
//
//         }
//
//         /**
//          * Make an Image widget and navigate to the edit page for it
//          */
//         function makeImage() {
//
//             var toAdd = {_id: 0, widgetType: "IMAGE", pageId: vm.pageId, width: "100%", url: ""};
//
//             navigate(toAdd);
//
//         }
//
//         /**
//          * Make a Youtube widget and navigate to the edit page for it
//          */
//         function makeYoutube() {
//
//             var toAdd = {_id: 0, widgetType: "YOUTUBE", pageId: vm.pageId, width: "100%", url: ""};
//
//             navigate(toAdd);
//
//         }
//
//         /**
//          * Navigate to the edit page for the given widget
//          */
//         function navigate(widget) {
//
//             var real = WidgetService.createWidget(vm.pageId, widget);
//
//             $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget/" + real._id);
//
//         }
//
//     }
//
// })();