var app = require('../../express');
var userModel = require('../model/user/user.model.server');

//for dynamic data

//:userId :path param
//another type is query param

app.post('/api/user', createUser);
app.get('/api/user', findAllUsers);
/* can't enter this section, because all the url will go
 straight into the above */
app.get('/api/user', findUserByCredentials);
app.get('/api/user', findUserByUsername);
/*------------------------------------------------------*/
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
// app.post('/api/user', findAllUsers);

function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(500);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(500);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        });
}


function findUserByUsername(username, res) {
    // var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function () {
            res.sendStatus(500);
        });
}

function findUserByCredentials(username, password, res) {
    // var username = req.query.username;
    // var password = req.query.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function () {
            res.sendStatus(500);
        });
}

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
        findUserByCredentials(username, password, res);
    } else if (username) {
        findUserByUsername(username, res);
    } else {
        res.sendStatus(404);
    }
}