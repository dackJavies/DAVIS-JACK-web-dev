module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {

        var page = req.body;
        var websiteId = req.params.websiteId;

        pageModel
            .createPage(websiteId, page)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

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
            );
        
    }

};