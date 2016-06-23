module.exports = function(app, models) {

    var commentModel = models.commentModel;

    app.post("/projectapi/comment", createComment);
    app.get("/projectapi/comment/:cid", findCommentById);
    app.get("/projectapi/comment/all/:pid", findAllCommentsForPuzzle);
    app.put("/projectapi/comment/:cid", updateComment);
    app.delete("/projectapi/comment/:cid", deleteComment);

    function createComment(req, res) {

        var comment = req.body;

        commentModel
            .createComment(comment)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function findCommentById(req, res) {

        var commentId = req.params["cid"];

        commentModel
            .findCommentById(commentId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findAllCommentsForPuzzle(req, res) {

        var puzzleId = req.params["pid"];

        commentModel
            .findAllCommentsForPuzzle(puzzleId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function updateComment(req, res) {

        var commentId = req.params["cid"];
        var comment = req.body;

        commentModel
            .updateComment(commentId, comment)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function deleteComment(req, res) {

        var commentId = req.params["cid"];

        commentModel
            .deleteComment(commentId)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

};