module.exports = function() {

    var mongoose = require("mongoose");
    var MessageSchema = require("./message.schema.server")();
    var Message = mongoose.model("Message", MessageSchema);

    var api = {

        createMessage: createMessage,
        findMessageById: findMessageById,
        findAllMessagesForUsers: findAllMessagesForUsers,
        updateMessage: updateMessage,
        deleteMessage: deleteMessage

    };

    return api;
    
    function createMessage(message) {
        
        return Message.create(message);
        
    }
    
    function findMessageById(messageId) {
        
        return Message.findById(messageId);
        
    }
    
    function findAllMessagesForUsers(userOne, userTwo) {

        return Message.find({$or: [{author: userOne, recipient: userTwo}, {author: userTwo, recipient: userOne}]});

    }

    function updateMessage(messageId, message) {

        return Message.update(
            {_id: messageId},
            {
                text: message.text
            }
        );

    }

    function deleteMessage(messageId) {

        return Message.remove({_id: messageId});

    }

};