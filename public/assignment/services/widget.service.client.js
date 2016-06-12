(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {

            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sorted: sorted

        };

        return api;


        /**
         * Add a new widget to the array
         *
         * @param pageId The page ID of the new widget
         * @param widget The widget object to be tweaked and added
         */
        function createWidget(pageId, widget) {

            widget._page = pageId;
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);

        }

        /**
         * Find all widgets attributed to the given page ID
         *
         * @param pageId The page ID in question
         * @returns {Array} The array of widgets attributed to that page
         */
        function findWidgetsByPageId(pageId) {

            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);

        }

        /**
         * Find a widget by its ID
         *
         * @param widgetId The ID to search for
         * @returns {*} The sought after widget or null if it does not exist
         */
        function findWidgetById(widgetId) {

            var url = "/api/widget/" + widgetId;
            return $http.get(url);

        }

        /**
         * Update a widget based on its id
         *
         * @param widgetId The id of the widget to be updated
         * @param widget The data to update the widget to
         * @returns {boolean} Whether the update was successful
         */
        function updateWidget(widgetId, widget) {

            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);

        }

        /**
         * Delete a widget based on its id
         *
         * @param widgetId The id of the widget to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deleteWidget(widgetId) {

            var url = "/api/widget/" + widgetId;
            return $http.delete(url);

        }

        function sorted(startIndex, endIndex, pageId) {

            var url = "/api/widget?start=" + startIndex + "&end=" + endIndex + "&pid=" + pageId;
            return $http.put(url);

        }

    }

})();