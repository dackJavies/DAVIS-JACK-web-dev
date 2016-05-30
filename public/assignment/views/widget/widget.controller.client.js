(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {

        var vm = this;

        vm.userId = vm.webId = vm.pageId = null;

        vm.makeHeader = makeHeader;
        vm.makeImage = makeImage;
        vm.makeYoutube = makeYoutube;
        vm.navigate = navigate;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];

        }

        init();

        /**
         * Make a Header widget and navigate to the edit page for it
         */
        function makeHeader() {

            var toAdd = {_id: 0, widgetType: "HEADER", pageId: vm.pageId, size: 1, text: ""};

            navigate(toAdd);

        }

        /**
         * Make an Image widget and navigate to the edit page for it
         */
        function makeImage() {

            var toAdd = {_id: 0, widgetType: "IMAGE", pageId: vm.pageId, width: "100%", url: ""};

            navigate(toAdd);

        }

        /**
         * Make a Youtube widget and navigate to the edit page for it
         */
        function makeYoutube() {

            var toAdd = {_id: 0, widgetType: "YOUTUBE", pageId: vm.pageId, width: "100%", url: ""};

            navigate(toAdd);

        }

        /**
         * Navigate to the edit page for the given widget
         */
        function navigate(widget) {

            var real = WidgetService.createWidget(vm.pageId, widget);

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget/" + real._id);

        }

    }

    function EditWidgetController($routeParams, WidgetService, $location) {

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