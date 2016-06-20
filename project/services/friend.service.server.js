module.exports = function(app, models) {

    var friendModel = models.friendModel;

    app.get("/api/friend/:fid", findFriendById);
    app.get("/api/friend", findFriendByUsername);
    app.delete("/api/friend/:fid", deleteFriend);

    function findFriendById(req, res) {

        var friendId = req.params["fid"];

        friendModel
            .findFriendById(friendId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findFriendByUsername(req, res) {

        var username = req.query["username"];

        friendModel
            .findFriendByUsername(username)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function deleteFriend(req, res) {



    }

};