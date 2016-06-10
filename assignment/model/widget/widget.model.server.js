module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
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

        widget._page = pageId;
        return Widget.create(widget);

    }

    /**
     * Retrieves all widgets for parent page whose _id is pageId
     *
     * @param pageId The id of the page whose widgets are being retrieved
     */
    function findAllWidgetsForPage(pageId) {

        return Widget.find({_page: pageId});

    }

    /**
     * Retrieves widget whose _id is widgetId
     *
     * @param widgetId The id of the widget to be found
     */
    function findWidgetById(widgetId) {

        return Widget.findById(widgetId);

    }

    /**
     * Updates widget whose _id is widgetId
     *
     * @param widgetId The id of the widget to be updated
     * @param widget The widget to update it to
     */
    function updateWidget(widgetId, widget) {

        switch(widget.type) {

            case 'HEADING':
                return Widget.update(
                    {_id: widgetId},
                    {
                        _page: widget._page,
                        type: widget.type,
                        name: widget.name,
                        text: widget.text,
                        size: widget.size,
                        placeholder: widget.placeholder,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted
                    }
                );

            case 'IMAGE':
                return Widget.update(
                    {_id: widgetId},
                    {
                        _page: widget._page,
                        type: widget.type,
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted
                    }
                );

            case 'YOUTUBE':
                return Widget.update(
                    {_id: widgetId},
                    {
                        _page: widget._page,
                        type: widget.type,
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted
                    }
                );

        }

    }

    /**
     * Removes widget whose _id is widgetId
     *
     * @param widgetId The id of the widget to be deleted
     */
    function deleteWidget(widgetId) {

        return Widget.remove({_id: widgetId});

    }

    /**
     * Modifies the order of widget at position start into final position end in page whose _id is pageId
     *
     * @param pageId The id of the page to be reordered
     * @param start The current location of the widget
     * @param end The desired location of the widget
     */
    function reorderWidget(pageId, start, end) {

        //TODO

    }

};