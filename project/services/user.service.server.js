module.exports = function(app) {

    // Passport
    var passport = require("passport");
    var auth = authorized;
    var LocalStrategy = require('passport-local').Strategy;


    // Need user model for passport
    var userModel = require("../model/user/user.model.server.js")();
    passport.use('searchScape', new LocalStrategy(localStrategy));


    //Serialization
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // API
    app.post  ('/api/login',            passport.authenticate('searchScape'), login);
    app.post  ('/api/logout',           logout);
    app.post  ('/api/register',         register);
    app.get ('/api/loggedin',           loggedin);

    app.post("/api/user",               createUser);
    app.get("/api/user",                getUsers);
    app.get("/api/user/:uid",           findUserById);
    app.put("/api/user/:uid",           updateUser);
    app.delete("/api/user/:uid",        deleteUser);


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
            .findUserByCredentials({username: username, password: password})
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
                                res.status(400).send(err);
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



    }

    function findUserByCredentials(username, password, res) {



    }

    function findUserByUsername(username, res) {



    }

    function findUserById(req, res) {



    }

    function updateUser(req, res) {



    }

    function deleteUser(req, res) {


        
    }

};