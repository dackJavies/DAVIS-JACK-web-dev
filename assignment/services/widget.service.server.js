module.exports = function(app, models) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;

    // var widgets = [
    //     { _id: "123", widgetType: "HEADER", pageId: "321", size: "2", text: "GIZMODO"},
    //     { _id: "234", widgetType: "HEADER", pageId: "321", size: "4", text: "Lorem ipsum"},
    //     { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
    //         url: "http://lorempixel.com/400/200/"},
    //     { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    //     { _id: "567", widgetType: "HEADER", pageId: "321", size: "4", text: "Lorem ipsum"},
    //     { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
    //         url: "https://youtu.be/AM2Ivdi9c4E" },
    //     { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
    // ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {

        var widget = req.body;

        widgetModel
            .createWidget(widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // widget._id = widgets.length + "";
        // widgets.push(widget);
        // res.send(widget);

    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // var result = [];
        //
        // for (var i in widgets) {
        //
        //     if (widgets[i].pageId == pageId) {
        //         result.push(widgets[i]);
        //     }
        //
        // }
        //
        // res.send(result);

    }

    function findWidgetById(req, res) {

        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for (var i in widgets) {
        //
        //     if (widgets[i]._id == widgetId) {
        //         res.send(widgets[i]);
        //         return;
        //     }
        //
        // }
        //
        // res.send({});

    }

    function updateWidget(req, res) {

        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for (var i in widgets) {
        //
        //     if (widgets[i]._id == widgetId) {
        //         widgets[i] = widget;
        //         res.sendStatus(200);
        //         return;
        //     }
        //
        // }
        //
        // res.sendStatus(400);

    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var pageId        = req.body.pageId;
        var webId         = req.body.webId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if(widgets[i]._id == widgetId) {
                widgets[i].url = "/uploads/"+filename;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + webId + "/page/" + pageId + "/widget/");
    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(response) {
                    res.send(response);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for (var i in widgets) {
        //
        //     if (widgets[i]._id == widgetId) {
        //         widgets.splice(i, 1);
        //         res.sendStatus(200);
        //     }
        //
        // }
        //
        // res.sendStatus(400);

    }

};