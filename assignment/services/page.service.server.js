module.exports = function(app, models) {

    var pageModel = models.pageModel;

    // var pages = [
    //     { _id: "321", name: "Post 1", websiteId: "456" },
    //     { _id: "432", name: "Post 2", websiteId: "456" },
    //     { _id: "543", name: "Post 3", websiteId: "456" }
    // ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {

        var page = req.body;

        pageModel
            .createPage(page)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // page._id = pages.length;
        // pages.push(page);
        // res.sendStatus(200);

    }

    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.send(pages);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for (var i in pages) {
        //
        //     if (pages[i].websiteId == websiteId) {
        //         result.push(pages[i]);
        //     }
        //
        // }
        //
        // res.send(result);

    }

    function findPageById(req, res) {

        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for (var i in pages) {
        //
        //     if (pages[i]._id == pageId) {
        //         res.send(pages[i]);
        //         return;
        //     }
        //
        // }
        //
        // res.send({});

    }

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for (var i in pages) {
        //
        //     if (pages[i]._id == pageId) {
        //         pages[i] = page;
        //         return;
        //     }
        //
        // }
        //
        // res.sendStatus(400);

    }

    function deletePage(req, res) {

        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function(response) {
                    res.send(response);
                },
                function(error) {
                    res.sendStatus(400);
                }
            )

        // for (var i in pages) {
        //
        //     if (pages[i]._id == pageId) {
        //         pages.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        //
        // }
        //
        // res.sendStatus(400);
        
    }

};