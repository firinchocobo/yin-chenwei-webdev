const app = require('../../express');

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];
//for dynamic data

//:userId :path param
//another type is query param

app.post('/api/user', createUser);
app.get('/api/user', findUserByUsername);
app.get('/api/user', findUserByCredentials);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

// app.post('/api/user', findAllUsers);
// app.get('/api/user', findAllUsers);

// function findAllUsers(req, res) {
//     var username = req.query['username'];
//     var password = req.query['password'];
//     if(username && password) {
//         for (var i in users) {
//             var userI = users[i];
//             if (userI.username === username && userI.password === password) {
//                 res.send(userI);
//             } else if (userI.username === username && userI.password !== password) {
//                 return "incorrect password";
//             } else if (userI.username !== username && userI.password === password) {
//                 return "incorrect username";
//             }
//         }
//         return null;
//     } else {
//         res.json(users);
//
//     }
// }

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    for (var i in users) {
        if (users[i]._id === userId) {
            users[i] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserById(req, res) {
    var userId = req.params.userId;
    var user = users.find(function (user) {
        return user._id === userId;
    });
    if (user !== 'undefined') {
        res.json(user);
        return;
    }
    res.sendStatus(404);
}


function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    for (var i in users) {
        var userI = users[i];
        if (userI.username === username && userI.password === password) {
            res.json(userI);
            // res.sendStatus(200);
            return;
        }

        // } else if (userI.username === username && userI.password !== password) {
        //     res.sendStatus(404);
        //     return;
        // }
    }
    res.sendStatus(404);
}

function findUserByUsername(req, res) {
    var username = req.query.username;
    for (var i in users) {
        if (users[i].username === username) {
            //console.log(username);
            res.json(users[i]);
            // res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime()+"";
    users.push(user);
    res.json(user);
    // res.sendStatus(200);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    for (var i in users) {
        if (users[i]._id === userId) {
            users.splice(i, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
