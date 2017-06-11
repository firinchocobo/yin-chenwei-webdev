var mongoose = require('mongoose');

var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findAllUser = findAllUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;

//if requires, will have access to userModel and all the function listed above
module.exports = userModel;

function createUser(user) {
    //return a promise
    // console.log(user);
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    delete user.username;
    delete user.password;
    return userModel.update({_id: userId}, {$set: user});
}
function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findAllUser() {
    return userModel.find();
}

function addWebsite(userId, websiteId) {
    userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            // console.log(user.websites);
            return user.save();
        });
}

function deleteWebsite(userId, websiteId) {
    userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
}
