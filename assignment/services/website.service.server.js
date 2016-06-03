module.exports = function(app) {

    var websites = [
        { _id: "123", name: "Facebook",    developerId: "456" },
        { _id: "234", name: "Tweeter",     developerId: "456" },
        { _id: "456", name: "Gizmodo",     developerId: "456" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123" },
        { _id: "678", name: "Checkers",    developerId: "123" },
        { _id: "789", name: "Chess",       developerId: "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        
        var website = req.body;

        website._id = websites.length;
        websites.push(website);
        return website;

    }

    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;

        var result = [];

        for(var i in websites) {

            if (websites[i].developerId === userId) {
                result.push(websites[i]);
            }

        }

        res.send(result);

    }

    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;

        for (var i in websites) {

            if (websites[i]._id == websiteId) {
                res.send(websites[i]);
                return;
            }

        }

        res.send({});

    }

    function updateWebsite(req, res) {

        var websiteId = req.params.websiteId;
        var website = req.body;

        for (var i in websites) {

            if (websites[i]._id === websiteId) {
                websites[i] = website;
                res.send(200);
            }

        }

        res.send(400);

    }

    function deleteWebsite(req, res) {

        for(var i in websites) {

            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.send(200);
            }

        }

        res.send(400);

    }

};