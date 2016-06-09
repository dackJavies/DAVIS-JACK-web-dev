module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {

        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByUsername(username, res) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function findUserByCredentials(username, password, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function findUserById(req, res) {

        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function updateUser(req, res) {

        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

    function deleteUser(req, res) {

        var delId = req.params.userId;                              // Retrieve user id

        userModel
            .deleteUser(delId)
            .then(
                function(response) {
                    res.send(response.data);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );

    }

};