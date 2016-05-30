(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {

        var vm = this;

        vm.userId = vm.webId = vm.pageId = vm.widgetId = vm.widget = null;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];

            vm.widget = WidgetService.findWidgetById(vm.widgetId);

        }

        init();


        function updateWidget() {

            WidgetService.updateWidget(vm.widgetId, vm.widget);

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");

        }

        function deleteWidget() {

            WidgetService.deleteWidget(vm.widgetId);

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");

        }

    }

})();