var app = require('../../express');
var userModel = require('../model/user/user.model.server');

// var users = [
//     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
//     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
//     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
// ];

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
        }, function (err) {
            res.send(err);
        });
    // var user = users.find(function (user) {
    //     return user._id === userId;
    // });
    // if (user) {
    //     res.json(user);
    //     return;
    // }
    // res.sendStatus(404);
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // res.json(user);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        })
    // for (var i in users) {
    //     if (users[i]._id === userId) {
    //         users[i] = user;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        })
    // for (var i in users) {
    //     if (users[i]._id === userId) {
    //         users.splice(i, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
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
        }, function (err) {
            res.send(err);
        });
    // for (var i in users) {
    //     if (users[i].username === username) {
    //         //console.log(username);
    //         res.json(users[i]);
    //         // res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
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
        }, function (err) {
            res.send(err);
        });
    // for (var i in users) {
    //     var userI = users[i];
    //     if (userI.username === username && userI.password === password) {
    //         res.json(userI);
    //         // res.sendStatus(200);
    //         return;
    //     } else if (userI.username === username && userI.password !== password) {
    //         // console.log(users);
    //         res.status(404).json({error: 'something is wrong'});
    //         // res.status(404).send("incorrect password");
    //         // res.sendStatus(404);
    //
    //         return;
    //     }
    // }
    // res.sendStatus(404);
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