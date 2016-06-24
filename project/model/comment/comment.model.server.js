module.exports = function() {

    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server")();
    var Comment = mongoose.model("Comment", CommentSchema);

    var api = {
        
        createComment: createComment,
        findCommentById: findCommentById,
        findAllCommentsForPuzzle: findAllCommentsForPuzzle,
        updateComment: updateComment,
        deleteComment: deleteComment

    };

    return api;
    
    function createComment(comment) {
        
        return Comment.create(comment);
        
    }
    
    function findCommentById(commentId) {
        
        return Comment.findById(commentId);
        
    }
    
    function findAllCommentsForPuzzle(puzzleId) {
        
        return Comment.find({_puzzle: puzzleId});
        
    }

    function updateComment(commentId, comment) {

        return Comment.update(
            {_id: commentId},
            {
                text: comment.text
            }
        );

    }

    function deleteComment(commentId) {

        return Comment.remove({_id: commentId});

    }

};