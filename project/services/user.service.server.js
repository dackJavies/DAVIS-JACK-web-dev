module.exports = function(app) {

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {

        var toAdd = req.body;

        userModel
            .createUser(toAdd)
            .then(
                function(succ) {

                },
                function(err) {

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