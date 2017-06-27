var mongojs = require('mongojs');
var q = require('q');

var db = mongojs('webdev_wam');

module.exports = {
    findAll: findAll,
    create: create
};

function create(collectionName, doc) {
    var deferred = q.defer();
    var collection = db.collection(collectionName);
    collection.insert(doc, function (err, docs) {
        if (err) {
            deferred.reject(err);
        } else {
            // console.log(docs);
            deferred.resolve(docs);
        }
    });
}

function findAll(collectionName) {
    var deferred = q.defer();
    var collection = db.collection(collectionName);
    collection.find(function (err, docs) {
        if(err) {
            deferred.reject(err);
        } else {
            console.log(docs);
            deferred.resolve(docs);
        }
    });
}

