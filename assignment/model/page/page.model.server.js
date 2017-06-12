var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.deletePagesForWebsite = deletePagesForWebsite;

module.exports = pageModel;

function deletePagesForWebsite(websiteId) {
    var widgetModel = require('../widget/widget.model.server');

    return pageModel
        .find({_website: websiteId})
        .then(function (pages) {
            var pageCopy = pages;
            return pageModel
                .deleteMany({_website: websiteId})
                .then(function () {
                    return pageCopy.forEach(function (page) {
                        return widgetModel
                            .deleteWidgetsForPage(page._id);
                    })
                })
        })
}

function addWidget(widgetId, pageId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}

function deleteWidget(widgetId, pageId) {
    pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(page._id, websiteId);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    page.accessed = Date.now();
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    var widgetModel = require('../widget/widget.model.server');

    return pageModel
        .findByIdAndRemove(pageId)
        .then(function (page) {
            return websiteModel
                .deletePage(pageId, page._website);
        })
        .then(function () {
            return widgetModel
                .deleteWidgetsForPage(pageId);
        });
}

