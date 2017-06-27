// console.log('hello from mongojs');
// var mongoose = require('mongoose');

// var connectionString = 'mongodb://localhost/webdev';
//
// mongoose.connect(connectionString);
var mongojs = require('mongojs');
var q = require('q');
var db = mongojs('webdev');

db.insert = insert;
db.find = find;
db.update = update;
db.remove = remove;
module.exports = db;
// insert({username: '123', first: '123', last: '123'})
//     .then(function (newUser) {
//         console.log(newUser)
//     });

function update(collection, filter, newDoc) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.update(filter, newDoc, function (err, status) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(status);
        }
    });
    return deferred.promise;
}

function find(collection, filter) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.find(filter, function (err, docs) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}

function insert(collection, doc) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.insert(doc, function (err, doc) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

function remove(collection, filter) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.remove(filter, function (err, docs) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}

// remove('testMongoJs', {username: 'alice'})
//     .then(function (status) {
//         return find('testMongoJs');
//     })
//     .then(function (users) {
//         console.log(users);
//     });
// update('testMongoJs', {username: '123'}, {username: 'alice'})
//     .then(function (status) {
//         return find('testMongoJs');
//     })
//     .then(function (users) {
//         console.log(users);
//     });
//
// insert('testMongoJs', {username: '123', first: '123', last: '123'})
//     .then(function (newUser) {
//         console.log(newUser)
//     });
//
// find('testMongoJs')
//     .then(function (users) {
//         console.log(users)
//     });
