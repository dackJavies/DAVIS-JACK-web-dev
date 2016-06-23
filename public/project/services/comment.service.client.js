(function() {
    angular
        .module("SearchScape")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {

            createComment: createComment,
            findCommentById: findCommentById,
            findAllCommentsForPuzzle: findAllCommentsForPuzzle,
            updateComment: updateComment,
            deleteComment: deleteComment

        };

        return api;

        function createComment(comment) {
            return $http.post("/projectapi/comment", comment);
        }

        function findCommentById(commentId) {
            return $http.get("/projectapi/comment/" + commentId);
        }

        function findAllCommentsForPuzzle(puzzleId) {
            return $http.get("/projectapi/comment/all/" + puzzleId);
        }

        function updateComment(commentId, comment) {
            return $http.put("/projectapi/comment/" + commentId, comment);
        }

        function deleteComment(commentId) {
            return $http.delete("/projectapi/comment/" + commentId);
        }

    }

})();