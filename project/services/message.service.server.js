module.exports = function(app, models) {

    var messageModel = models.messageModel;

    app.post("/projectapi/message", createMessage);
    app.get("/projectapi/message/id/:mid", findMessageById);
    app.get("/projectapi/message/auth/:aid/reci/:rid", findAllMessagesForUsers);
    app.put("/projectapi/message/:mid", updateMessage);
    app.delete("/projectapi/message/:mid", deleteMessage);

    function createMessage(req, res) {

        var message = req.body;

        messageModel
            .createMessage(message)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function findMessageById(req, res) {

        var messageId = req.params["mid"];

        messageModel
            .findMessageById(messageId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findAllMessagesForUsers(req, res) {

        var userOne = req.params["aid"];
        var userTwo = req.params["rid"];

        messageModel
            .findAllMessagesForUsers(userOne, userTwo)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function updateMessage(req, res) {

        var messageId = req.params["mid"];
        var message = req.body;

        messageModel
            .updateMessage(messageId, message)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function deleteMessage(req, res) {

        var messageId = req.params["mid"];

        messageModel
            .deleteMessage(messageId)
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