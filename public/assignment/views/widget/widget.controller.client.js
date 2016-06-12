(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function NewWidgetController($routeParams, WidgetService, $location) {

        var vm = this;

        vm.userId = vm.webId = vm.pageId = null;

        vm.makeHeader = makeHeader;
        vm.makeImage = makeImage;
        vm.makeYoutube = makeYoutube;
        vm.makeHTML = makeHTML;
        vm.makeTextInput = makeTextInput;
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

            var toAdd = {_page: vm.pageId, type: "HEADING", size: 1, text: ""};

            navigate(toAdd);

        }

        /**
         * Make an Image widget and navigate to the edit page for it
         */
        function makeImage() {

            var toAdd = {_page: vm.pageId, type: "IMAGE", width: "100%", url: ""};

            navigate(toAdd);

        }

        /**
         * Make a Youtube widget and navigate to the edit page for it
         */
        function makeYoutube() {

            var toAdd = {_page: vm.pageId, type: "YOUTUBE", width: "100%", url: ""};

            navigate(toAdd);

        }

        function makeHTML() {

            var toAdd = {_page: vm.pageId, type: "HTML"};

            navigate(toAdd);

        }

        function makeTextInput() {

            var toAdd = {_page: vm.pageId, type: "INPUT"};

            navigate(toAdd);

        }

        /**
         * Navigate to the edit page for the given widget
         */
        function navigate(widget) {

            WidgetService
                .createWidget(vm.pageId, widget)
                .then(
                    function(response) {
                        var real = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/"
                            + vm.pageId + "/widget/" + real._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

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

            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function(response) {
                        vm.widget = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

        init();


        function updateWidget() {

            if (vm.widget.name && !(vm.widget.name === "")) {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "Name required.";
            }

        }

        function deleteWidget() {

            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }

    }

    function WidgetListController($sce, $routeParams, WidgetService) {

        $("#widgetRepeater").sortable({axis:"y"});

        var vm = this;

        vm.userId = vm.webId = vm.pageId = vm.widgets = null;

        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];

            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function(response) {
                        vm.widgets = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

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

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {

        var vm = this;

        vm.userId = vm.webId = vm.pageId = vm.widgetId = null;
        vm.photos = null;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.webId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];

        }

        init();

        function searchPhotos(searchText) {

            var data;

            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });

        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {_id: vm.widgetId, widgetType: "IMAGE", pageId: vm.pageId + "", width: "100%", url: url};

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(
                    function(response) {

                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);

        }

    }
    
})();