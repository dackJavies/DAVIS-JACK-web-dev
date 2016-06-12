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
        return Widget.count().then(
            function(count) {
                widget.order = count;
                return Widget.create(widget);
            }
        );

    }

    /**
     * Retrieves all widgets for parent page whose _id is pageId
     *
     * @param pageId The id of the page whose widgets are being retrieved
     */
    function findAllWidgetsForPage(pageId) {

        return Widget.find({_page: pageId}).sort({order: 1});

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
                        name: widget.name,
                        text: widget.text,
                        size: widget.size,
                        placeholder: widget.placeholder,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted,
                        order: widget.order
                    }
                );

            case 'IMAGE':
                return Widget.update(
                    {_id: widgetId},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        url: widget.url,
                        width: widget.width,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted,
                        order: widget.order
                    }
                );

            case 'YOUTUBE':
                return Widget.update(
                    {_id: widgetId},
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted,
                        order: widget.order
                    }
                );

            case 'HTML':
                return Widget.update(
                    {_id: widgetId},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        order: widget.order
                    }
                );

            case 'INPUT':
                return Widget.update(
                    {_id: widgetId},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        deletable: widget.deletable,
                        formatted: widget.formatted,
                        order: widget.order
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
     * @param start The current location of the widget
     * @param end The desired location of the widget
     */
    function reorderWidget(start, end) {

        return Widget.update({order : start}, {order : -1}).then(
            function(success) {
                return Widget.update({order : end}, {order: start}).then(
                    function(success) {
                        return Widget.update({order : -1}, {order : end});
                    }
                );
            }
        );

    }

};