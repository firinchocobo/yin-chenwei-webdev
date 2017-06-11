const app = require('../../express');

var pageModel = require('../model/page/page.model.server');

// var pages = [
//     {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
//     {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
//     {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
// ];

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
    // page._id = (new Date()).getTime() + "";
    // page.websiteId = websiteId;
    // page.created = new Date();
    // page.accessed = new Date();
    // pages.push(page);
    // res.sendStatus(200);
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        }, function () {
            res.sendStatus(500);
        })
    // var result = [];
    // for (var i in pages) {
    //     if (pages[i].websiteId === websiteId) {
    //         result.push(pages[i]);
    //     }
    // }
    // res.json(result);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        }, function () {
            res.sendStatus(500);
        })
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // if (page) {
    //     res.json(page);
    // } else {
    //     res.sendStatus(404);
    // }
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
    // for (var i in pages) {
    //     if (pages[i]._id === pageId) {
    //         pages[i] = page;
    //         pages[i].accessed = new Date();
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
    // for (var i in pages) {
    //     if (pages[i]._id === pageId) {
    //         pages.splice(i, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}