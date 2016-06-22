module.exports = function() {

    var mongoose = require("mongoose");
    var PuzzleSchema = require("./puzzle.schema.server.js")();
    var Puzzle = mongoose.model("Puzzle", PuzzleSchema);
    
    var api = {
        
        createPuzzle: createPuzzle,
        findPuzzleById: findPuzzleById,
        findAllPuzzlesForUser: findAllPuzzlesForUser,
        updatePuzzle: updatePuzzle,
        deletePuzzle: deletePuzzle
        
    };
    
    return api;

    function createPuzzle(userId, puzzle) {

        puzzle._user = userId;
        return Puzzle.create(puzzle);

    }

    function findPuzzleById(puzzleId) {

        return Puzzle.findById(puzzleId);

    }

    function findAllPuzzlesForUser(userId) {

        return Puzzle.find({_user: userId});

    }

    function updatePuzzle(puzzleId, puzzle) {

        return Puzzle.update(
            {_id: puzzleId},
            {
                name: puzzle.name
            }
        );

    }

    function deletePuzzle(puzzleId) {

        return Puzzle.remove({_id: puzzleId});

    }

};