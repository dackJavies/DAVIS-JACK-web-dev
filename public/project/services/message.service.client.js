(function () {
    angular
        .module("SearchScape")
        .factory("MessageService", MessageService);

    function MessageService($http) {

        var api = {

            createMessage: createMessage,
            findMessageById: findMessageById,
            findAllMessagesForUsers: findAllMessagesForUsers,
            updateMessage: updateMessage,
            deleteMessage: deleteMessage

        };

        return api;

        function createMessage(message) {
            return $http.post("/projectapi/message", message);
        }

        function findMessageById(messageId) {
            return $http.get("/projectapi/message/id/" + messageId);
        }

        function findAllMessagesForUsers(userId, friendId) {
            return $http.get("/projectapi/message/auth/" + userId + "/reci/" + friendId);
        }

        function findMessageByAuthor(authorId) {
            return $http.get("/projectapi/message/author/" + authorId);
        }

        function updateMessage(messageId, message) {
            return $http.put("/projectapi/message/" + messageId, message);
        }

        function deleteMessage(messageId) {
            return $http.delete("/projectapi/message/" + messageId);
        }

    }

})();