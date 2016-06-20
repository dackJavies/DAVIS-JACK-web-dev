module.exports = function(app, models) {

    var puzzleModel = models.puzzleModel;

    app.post("/api/user/:uid/puzzle", createPuzzle);
    app.get("/api/puzzle/:pid", findPuzzleById);
    app.get("/api/user/:uid/puzzle", findAllPuzzlesForUser);
    app.put("/api/puzzle/:pid", updatePuzzle);
    app.delete("/api/puzzle/:pid", deletePuzzle);

    function createPuzzle(req, res) {

        var toAdd = req.body;
        var userId = req.params["uid"];

        puzzleModel
            .createPuzzle(userId, toAdd)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function findPuzzleById(req, res) {

        var puzzleId = req.params["pid"];

        puzzleModel
            .findPuzzleById(puzzleId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findAllPuzzlesForUser(req, res) {

        var userId = req.params["uid"];

        puzzleModel
            .findAllPuzzlesForUser(userId)
            .then(
                function(succ) {
                    res.send(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function updatePuzzle(req, res) {

        var puzzleId = req.params["pid"];
        var puzzle = req.body;

        puzzleModel
            .updatePuzzle(puzzleId, puzzle)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function deletePuzzle(req, res) {

        var puzzleId = req.params["pid"];

        puzzleModel
            .deletePuzzle(puzzleId)
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