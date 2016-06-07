module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js");
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {

        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget

    };

    return api;

    /**
     * Creates new widget instance for parent page whose _id is pageId
     *
     * @param pageId The id of the page this widget belongs to
     * @param widget The widget to be created
     */
    function createWidget(pageId, widget) {



    }

    /**
     * Retrieves all widgets for parent page whose _id is pageId
     *
     * @param pageId The id of the page whose widgets are being retrieved
     */
    function findAllWidgetsForPage(pageId) {



    }

    /**
     * Retrieves widget whose _id is widgetId
     *
     * @param widgetId The id of the widget to be found
     */
    function findWidgetById(widgetId) {



    }

    /**
     * Updates widget whose _id is widgetId
     *
     * @param widgetId The id of the widget to be updated
     * @param widget The widget to update it to
     */
    function updateWidget(widgetId, widget) {



    }

    /**
     * Removes widget whose _id is widgetId
     *
     * @param widgetId The id of the widget to be deleted
     */
    function deleteWidget(widgetId) {



    }

    /**
     * Modifies the order of widget at position start into final position end in page whose _id is pageId
     *
     * @param pageId The id of the page to be reordered
     * @param start The current location of the widget
     * @param end The desired location of the widget
     */
    function reorderWidget(pageId, start, end) {



    }

};