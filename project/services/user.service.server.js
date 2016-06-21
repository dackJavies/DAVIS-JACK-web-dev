module.exports = function(app, models) {

    // Passport
    var passport = require("passport");
    var auth = authorized;
    var LocalStrategy = require('passport-local').Strategy;


    // Need user model for passport
    var userModel = models.userModel;
    passport.use('searchScape', new LocalStrategy(localStrategy));


    //Serialization
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // API
    app.post  ('/projectapi/login',            passport.authenticate('searchScape'), login);
    app.post  ('/projectapi/logout',           logout);
    app.post  ('/projectapi/register',         register);
    app.get ('/projectapi/loggedin',           loggedin);

    app.post("/projectapi/user",               createUser);
    app.get("/projectapi/user",                getUsers);
    app.get("/projectapi/user/:uid",           findUserById);
    app.get("/projectapi/user/:uid/friends",   findAllFriendsForUser);
    app.put("/projectapi/user/:uid/friend/:fid/add", addFriend);
    app.put("/projectapi/user/:uid/friend/:fid/remove", removeFriend);
    app.put("/projectapi/user/:uid",           updateUser);
    app.delete("/projectapi/user/:uid",        deleteUser);


    // ----- PASSPORT FUNCTIONS ------
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(resultUser){
                    done(null, resultUser);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    // ----- CRUD OPERATIONS -----
    function createUser(req, res) {

        var toAdd = req.body;
        toAdd.friends = [];

        userModel
            .createUser(toAdd)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
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

    function findUserByCredentials(username, password, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findUserByUsername(username, res) {

        userModel
            .findUserByUsername(username)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findUserById(req, res) {

        var userId = req.params["uid"];

        userModel
            .findUserById(userId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function findAllFriendsForUser(req, res) {

        var userId = req.params["uid"];

        userModel
            .findAllFriendsForUser(userId)
            .then(
                function(succ) {
                    res.json(succ);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );

    }

    function addFriend(req, res) {

        var userId = req.params["uid"];
        var friendId = req.params["fid"];

        userModel
            .addFriend(userId, friendId)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function removeFriend(req, res) {

        var userId = req.params["uid"];
        var friendId = req.params["fid"];

        userModel
            .removeFriend(userId, friendId)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function updateUser(req, res) {

        var user = req.body;
        var userId = req.params["uid"];

        userModel
            .updateUser(userId, user)
            .then(
                function(succ) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400);
                }
            );

    }

    function deleteUser(req, res) {

        var userId = req.params["uid"];

        userModel
            .deleteUser(userId)
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