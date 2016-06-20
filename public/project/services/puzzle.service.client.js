(function() {
    angular
        .module("SearchScape")
        .factory("PuzzleService", PuzzleService);

    function PuzzleService($http) {

        var api = {

            createPuzzle: createPuzzle,
            findPuzzleById: findPuzzleById,
            findAllPuzzlesForUser: findAllPuzzlesForUser,
            updatePuzzle: updatePuzzle,
            deletePuzzle: deletePuzzle

        };

        return api;

        function createPuzzle(userId, puzzle) {

            var url = "/api/user/" + userId +"/puzzle";
            return $http.post(url, puzzle);

        }

        function findPuzzleById(puzzleId) {

            var url = "/api/puzzle/" + puzzleId;
            return $http.get(url);

        }

        function findAllPuzzlesForUser(userId) {

            var url = "/api/user/" + userId + "/puzzle";
            return $http.get(url);

        }

        function updatePuzzle(puzzleId, puzzle) {

            var url = "/api/puzzle/" + puzzleId;
            return $http.put(url, puzzle);

        }

        function deletePuzzle(puzzleId) {

            var url = "/api/puzzle/" + puzzleId;
            return $http.delete(url);

        }

    }

})();