(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {

        var vm = this;

        vm.userId = vm.webId = vm.pageId = vm.widgets = null;

        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];

            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        }

        init();

        function getSafeHtml(widget) {

            return $sce.trustAsHtml(widget.text);

        }

        function getSafeUrl(widget) {

            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }


    }

})();