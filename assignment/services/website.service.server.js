const app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

// var websites = [
//     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
//     {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
//     {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
//     {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
//     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
//     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
//     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
// ];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);


function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        })
    // website._id = (new Date()).getTime() + "";
    // website.developerId = userId;
    // website.created = new Date();
    // website.accessed = new Date();
    // websites.push(website);
    // res.sendStatus(200);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        }, function (err) {
            res.send(err);
        });
    // var result = [];
    // for (var i in websites) {
    //     if (websites[i].developerId === userId) {
    //         result.push(websites[i]);
    //     }
    // }
    // res.json(result);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            // console.log(err);
            res.sendStatus(404);

        });
    // var website = websites.find(function (website) {
    //     return website._id === websiteId;
    // });
    // if (website) {
    //     res.json(website);
    // } else {
    //     res.sendStatus(404);
    // }
}
function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        })
    // for (var i in websites) {
    //     if (websites[i]._id === websiteId) {
    //         websites[i] = website;
    //         websites[i].accessed = new Date();
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        })
    // for (var i in websites) {
    //     if (websites[i]._id === websiteId) {
    //         websites.splice(i, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}