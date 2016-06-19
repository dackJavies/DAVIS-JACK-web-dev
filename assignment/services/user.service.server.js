module.exports = function(app, models) {

    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    var auth = authorized;
    passport.use('jgd-wam', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var bcrypt = require('bcrypt-nodejs');

    app.post  ('/api/login', passport.authenticate('jgd-wam'), login);
    app.post  ('/api/logout',         logout);
    app.post  ('/api/register',       register);
    app.get   ('/api/loggedin', loggedin);
    app.post("/api/user", auth, createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", auth, findUserById);
    app.put("/api/user/:userId", auth, updateUser);
    app.delete("/api/user/:userId", auth, deleteUser);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            )
    }

    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername(username, password)
            .then(
                function(user) {
                    // if (!user) { return done(null, false); }
                    // return done(null, user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(error) {
                    if (err) { return done(err); }
                }
            )

    }

    function facebookStrategy(token, refreshToken, profile, done) {

        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = {
                            username: profile.displayName.replace(/ /g, ""),
                            facebook: {
                                id : profile.id
                            }
                        };
                        return userModel
                            .createUser(newUser);
                    }
                }
            )
            .then(
                function(succ) {

                    return done(null, succ);

                }
            );

    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if (err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                }
            )
    }

    function loggedin(req, res) {

        res.send(req.isAuthenticated() ? req.user : '0');

    }

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