var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

widgetModel.deleteWidgetsForPage = deleteWidgetsForPage;

module.exports = widgetModel;

function deleteWidgetsForPage(pageId) {
    return widgetModel
        .deleteMany({_page: pageId})
        .exec()
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(widget._id, pageId)
                .then(function () {
                    return widget;
                });
        });
}

function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            return page.widgets;
        })

    // return widgetModel
    //     .find({_page: pageId})
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .findByIdAndRemove(widgetId)
        .then(function (widget) {
            return pageModel
                .deleteWidget(widgetId, widget._page)
        })
}

function reorderWidget(pageId, start, end) {
    // return widgetModel
    //     .find({_page: pageId})
    //     .then(function (widgets) {
    //         console.log(widgets);
    //         var widgetToPush = widgets.splice(start, 1);
    //         console.log(widgetToPush);
    //         widgets.splice(end, 0, widgetToPush);
    //         console.log(widgets);
    //
    //
    //     })
    //
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var widgetToPush = page.widgets.splice(start, 1);
            page.widgets.splice(end, 0, widgetToPush);
            return page.save();
        })
}