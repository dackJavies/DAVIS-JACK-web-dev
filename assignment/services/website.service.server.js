module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    // var websites = [
    //     { _id: "123", name: "Facebook",    developerId: "456" },
    //     { _id: "234", name: "Tweeter",     developerId: "456" },
    //     { _id: "456", name: "Gizmodo",     developerId: "456" },
    //     { _id: "567", name: "Tic Tac Toe", developerId: "123" },
    //     { _id: "678", name: "Checkers",    developerId: "123" },
    //     { _id: "789", name: "Chess",       developerId: "234" }
    // ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        
        var website = req.body;

        websiteModel
            .createWebsite(website)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // website._id = websites.length;
        // websites.push(website);
        // return website;

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

        // var result = [];
        //
        // for(var i in websites) {
        //
        //     if (websites[i].developerId === userId) {
        //         result.push(websites[i]);
        //     }
        //
        // }
        //
        // res.send(result);

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

        // for (var i in websites) {
        //
        //     if (websites[i]._id == websiteId) {
        //         res.send(websites[i]);
        //         return;
        //     }
        //
        // }
        //
        // res.send({});

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

        // for (var i in websites) {
        //
        //     if (websites[i]._id === websiteId) {
        //         websites[i] = website;
        //         res.sendStatus(200);
        //     }
        //
        // }
        //
        // res.sendStatus(400);

    }

    function deleteWebsite(req, res) {

        var websiteId = req.body;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(response) {
                    res.send(response.data);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

        // for(var i in websites) {
        //
        //     if (websites[i]._id === websiteId) {
        //         websites.splice(i, 1);
        //         res.sendStatus(200);
        //     }
        //
        // }
        //
        // res.sendStatus(400);

    }

};