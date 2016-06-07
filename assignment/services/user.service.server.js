module.exports = function(app, models) {

    var userModel = models.userModel;

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

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
            )

        // var user = req.body;
        //
        // for (var i in users) {
        //     if (users[i].username === user.username) {
        //         res.sendStatus(400);
        //         return;
        //     }
        // }
        //
        // user._id = users.length;
        // users.push(user);
        // res.send(user);

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

        // for (var i in users) {
        //
        //     if (users[i].username === username) {
        //         res.send(users[i]);
        //         return;
        //     }
        //
        // }
        //
        // res.send({});

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

        // for(var i in users) {
        //
        //     if (users[i].username == username && users[i].password == password) {
        //         res.send(users[i]);
        //         return;
        //     }
        //
        // }
        //
        // res.send({});

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

        // var userId = req.params.userId;                             // Retrieve ID
        //
        // for (var i in users) {
        //     if (userId === users[i]._id) {
        //         res.send(users[i]);                                 // Found user, send
        //         return;
        //     }
        // }
        //
        // res.send({});                                               // Send nothing if not found

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

        // for(var i in users) {
        //
        //     if (users[i]._id === id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.sendStatus(200);                                // Successfully updated
        //         return;
        //     }
        //
        // }
        //
        // res.sendStatus(400);                                       // Unable to find user

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

        // for(var i in users) {
        //
        //     if (users[i]._id === delId) {                           // If id found, splice it out
        //         users.splice(i, 1);
        //         res.sendStatus(200);                                     // Success
        //     }
        //
        // }
        //
        // res.sendStatus(400);                                            // Failure

    }

};