var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/webdev';

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

const app = require('../../../express');

var userModel = require('../../../assignment/model/user/user.model.server');

app.get('/lecture/ejs/crud/user', findAllUsers);
//cant do delete without js
app.get('/lecture/ejs/crud/user/:userId/delete', deleteUser);

app.get('/lecture/ejs/crud/user/:userId/select', selectUser);

app.post('/lecture/ejs/crud/user', postUser);

app.get('/hello/from/client', hello);


function selectUser(req, res) {
    var scope = {};
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            scope.selectedUser = user;
            return userModel
                .findAllUser();
        })
        .then(function (users) {
            scope.users = users;
            res.render('lecture/ejs/crud/user-list.view.server.ejs', scope);
        });
}
function postUser(req, res) {
    var user = req.body;
    if (user.action === 'create') {
        userModel
            .createUser(req.body)
            .then(function (user) {
                res.redirect('/lecture/ejs/crud/user');
            })
    } else if (user.action === 'update') {
        userModel
            .updateUser(user._id, user)
            .then(function (status) {
                res.redirect('/lecture/ejs/crud/user');
            })
    }
}

function deleteUser(req, res) {
    userModel
        .deleteUser(req.params.userId)
        .then(function (status) {
            res.redirect('/lecture/ejs/crud/user');
        });
}

function findAllUsers(req, res) {
    userModel
        .findAllUser()
        .then(function (users) {
            // res.json(users);
            var scope = {
                users : users,
                selectedUser : {}
            };
            res.render('lecture/ejs/crud/user-list.view.server.ejs', scope);
        })
}

function hello(req, res) {

    // res.json({message: 'hello from server'});
    res.render('lecture/ejs/crud/hello');
}