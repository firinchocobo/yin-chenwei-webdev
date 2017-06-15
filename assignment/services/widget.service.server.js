const app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/assignment6/uploads'});

var widgetModel = require('../model/widget/widget.model.server');

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
    }
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var callbackUrl = "/assignment/assignment6/index.html#!/website/" + websiteId +
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
            widget.url = '/assignment/assignment6/uploads/' + filename;
            return widgetModel
                .updateWidget(widgetId, widget);
        });
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
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function () {
            res.sendStatus(500);
        })
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
}


