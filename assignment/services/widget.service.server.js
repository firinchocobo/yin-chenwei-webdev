const app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/assignment3/uploads'});

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.put('/api/page/:pageId/widget', sortWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);
app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);


function sortWidget(req, res) {
    pageId = req.params.pageId;

    var start = req.query.index1;
    var end = req.query.index2;
    if (start === end) {
        res.sendStatus(200);
    }

    var smaller = Math.min(start, end);
    var larger = Math.max(start, end);
    var counter = 0;
    var temp = widgets[0];
    for (var i in widgets) {
        if (widgets[i].pageId === pageId) {
            if (counter === larger) {
                widgets[smaller] = widgets[larger];
                widgets[larger] = temp;
                res.sendStatus(200);
            }
            if (counter === smaller) {
                temp = widgets[i];
                smaller = i;
                counter += 1;
                continue;
            }
            counter += 1;
        }
    }
    res.sendStatus(404);
}
function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var callbackUrl = "/assignment/assignment4/index.html#!/user/" + userId + "/website/" + websiteId +
        "/page/" + pageId + "/widget/" + widgetId;

    if (!myFile) {
        res.redirect(callbackUrl);
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    changeUrlForWidget(widgetId, filename);
    res.redirect(callbackUrl);
}


function changeUrlForWidget(widgetId, filename) {
    for (var i in widgets) {
        if (widgets[i]._id === widgetId) {
            widgets[i].url = '/assignment/assignment4/uploads/' + filename;
            return;
        }
    }
}

function createWidget(req, res) {
    pageId = req.params.pageId;
    widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function findAllWidgetsForPage(req, res) {
    pageId = req.params.pageId;
    var result = [];
    for (var i in widgets) {
        if (widgets[i].pageId === pageId) {
            result.push(widgets[i]);
        }
    }
    res.json(result);
}

function findWidgetById(req, res) {
    widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (widget !== 'undefined') {
        res.json(widget);
    } else {
        res.sendStatus(404);
    }
}

function updateWidget(req, res) {
    widgetId = req.params.widgetId;
    widget = req.body;
    for (var i in widgets) {
        if (widgets[i]._id === widgetId) {
            widgets[i] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    widgetId = req.params.widgetId;
    for (var i in widgets) {
        if (widgets[i]._id === widgetId) {
            widgets.splice(i, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


