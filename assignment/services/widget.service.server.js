const app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/assignment5/uploads'});

var widgetModel = require('../model/widget/widget.model.server');

// var widgets = [
//     {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     {
//         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"
//     },
//     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     {
//         "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E"
//     },
//     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

app.put('/api/page/:pageId/widget', sortWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);
app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);


function sortWidget(req, res) {
    var pageId = req.params.pageId;
    var start = req.query.initial;
    var end = req.query.final;

    if (start === end) {
        res.sendStatus(200);
    } else {
        widgetModel
            .reorderWidget(pageId, start, end)
            .then(function () {
                res.sendStatus(200);
            }, function () {
                res.sendStatus(500);
            })
        // var counter = 0;
        // for (var i in widgets) {
        //     if (widgets[i].pageId === pageId) {
        //         if (counter === start) {
        //             start = i;
        //         } else if (counter === end) {
        //             end = i;
        //         }
        //         counter += 1;
        //     }
        // }
        //
        // var widgetToPush = widgets[start];
        // widgets.splice(start, 1);
        // widgets.splice(end, 0, widgetToPush);
        // res.sendStatus(200);
    }
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var callbackUrl = "/assignment/assignment5/index.html#!/user/" + userId + "/website/" + websiteId +
        "/page/" + pageId + "/widget/" + widgetId;

    if (!myFile) {
        res.redirect(callbackUrl);
    } else {

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        changeUrlForWidget(widgetId, filename);
        res.redirect(callbackUrl);
    }
}


function changeUrlForWidget(widgetId, filename) {
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/assignment/assignment5/uploads/' + filename;
            return widgetModel
                .updateWidget(widgetId, widget);
        });
    // for (var i in widgets) {
    //     if (widgets[i]._id === widgetId) {
    //         widgets[i].url = '/assignment/assignment5/uploads/' + filename;
    //         return;
    //     }
    // }
}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function () {
            res.sendStatus(500);
        })
    // widget._id = (new Date()).getTime() + "";
    // widget.pageId = pageId;
    // widgets.push(widget);
    // res.json(widget);
}

function findAllWidgetsForPage(req, res) {
    // console.log(widgets);
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function () {
            res.sendStatus(500);
        })
    // var result = [];
    // for (var i in widgets) {
    //     if (widgets[i].pageId === pageId) {
    //         result.push(widgets[i]);
    //     }
    // }
    // res.json(result);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function () {
            res.sendStatus(500);
        })
    // var widget = widgets.find(function (widget) {
    //     return widget._id === widgetId;
    // });
    // if (widget) {
    //     res.json(widget);
    // } else {
    //     res.sendStatus(404);
    // }
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
    // for (var i in widgets) {
    //     if (widgets[i]._id === widgetId) {
    //         widgets[i] = widget;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
    // for (var i in widgets) {
    //     if (widgets[i]._id === widgetId) {
    //         widgets.splice(i, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}


