module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        
        var website = req.body;

        websiteModel
            .createWebsiteForUser(website._user, website)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.send(websites);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function updateWebsite(req, res) {

        var websiteId = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
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