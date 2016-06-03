module.exports = function(app) {

    var widgets = [
        { _id: "123", widgetType: "HEADER", pageId: "321", size: "2", text: "GIZMODO"},
        { _id: "234", widgetType: "HEADER", pageId: "321", size: "4", text: "Lorem ipsum"},
        { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
            url: "http://lorempixel.com/400/200/"},
        { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
        { _id: "567", widgetType: "HEADER", pageId: "321", size: "4", text: "Lorem ipsum"},
        { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E" },
        { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {

        var widget = req.body;

        widget._id = widgets.length;
        widgets.push(widget);
        res.send(widget);

    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;

        var result = [];

        for (var i in widgets) {

            if (widgets[i].pageId == pageId) {
                result.push(widgets[i]);
            }

        }

        res.send(result);

    }

    function findWidgetById(req, res) {

        var widgetId = req.params.widgetId;

        for (var i in widgets) {

            if (widgets[i]._id == widgetId) {
                res.send(widgets[i]);
                return;
            }

        }

        res.send({});

    }

    function updateWidget(req, res) {

        var widgetId = req.params.widgetId;
        var widget = req.body;

        for (var i in widgets) {

            if (widgets[i]._id == widgetId) {
                widgets[i] = widget;
                res.send(200);
            }

        }

        res.send(400);

    }

    function deleteWidget(req, res) {



    }

};