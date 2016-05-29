(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { _id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
            { _id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                url: "http://lorempixel.com/400/200/"},
            { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            { _id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
        ];

        var api = {

            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };

        return api;


        /**
         * Add a new widget to the array
         *
         * @param pageId The page ID of the new widget
         * @param widget The widget object to be tweaked and added
         */
        function createWidget(pageId, widget) {

            widget.pageId = pageId;
            widget._id = widgets.length;
            widgets.push(widget);

        }

        /**
         * Find all widgets attributed to the given page ID
         *
         * @param pageId The page ID in question
         * @returns {Array} The array of widgets attributed to that page
         */
        function findWidgetsByPageId(pageId) {

            var result = [];

            for (var i in widgets) {

                if (widgets[i].pageId == pageId) {
                    result.push(widgets[i]);
                }

            }

            return result;

        }

        /**
         * Find a widget by its ID
         *
         * @param widgetId The ID to search for
         * @returns {*} The sought after widget or null if it does not exist
         */
        function findWidgetById(widgetId) {

            for (var i in widgets) {

                if (widgets[i]._id == widgetId) {
                    return widgets[i];
                }

            }

            return false;

        }

        /**
         * Update a widget based on its id
         *
         * @param widgetId The id of the widget to be updated
         * @param widget The data to update the widget to
         * @returns {boolean} Whether the update was successful
         */
        function updateWidget(widgetId, widget) {

            for (var i in widgets) {

                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    return true;
                }

            }

            return false;

        }

        /**
         * Delete a widget based on its id
         *
         * @param widgetId The id of the widget to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deleteWidget(widgetId) {

            for (var i in widgets) {

                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }

            }

            return false;

        }


    }

})();