var mongoose = require('mongoose');

var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

websiteModel.deleteWebsitesForUser = deleteWebsitesForUser;

module.exports = websiteModel;

function deleteWebsitesForUser(userId) {
    var pageModel = require('../page/page.model.server');

    return websiteModel
        .find({_user: userId})
        .then(function (websites) {
            var webCopy = websites;
            return websiteModel
                .deleteMany({_user: userId})
                .then(function () {
                    return webCopy.forEach(function (website) {
                        return pageModel
                            .deletePagesForWebsite(website._id);
                    })
                })
        })









        // .then(function (websites) {
        //     console.log('success - web model - find user id');
        //     return websites.forEach(function (website) {
        //         console.log("loop websiteid: "+website._id);
        //         return pageModel
        //             .deletePagesForWebsite(website._id);
        //     })
        // })
        // .then(function() {
        //     console.log('delete all website for user:' + userId);
        //     return websiteModel.deleteMany({_user: userId})
        //         .exec();
        // })
        // .then(function (websites) {
            // console.log('success - web model - find user id');
            // return Promise.all(websites.forEach(function (website) {
            //     console.log("loop websiteid: "+website._id);
            //     return pageModel
            //         .deletePagesForWebsite(website._id);
            // }));
            // return mongoose.Promise.all(p)

        //     var promises = websites;
        //     for (var i = 0; i < websites.length; i++) {
        //         pageModel.deletePagesForWebsite(websites[i]._id);
        //     }
        //     console.log(promises);
        //     return mongoose.Promise.all(promises);
        // })
        // .then(function () {
        //     console.log('delete all website for user:' + userId);
        //     return websiteModel.deleteMany({_user: userId})
        //         .exec();
        // })

}

function addPage(pageId, websiteId) {
    websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        })
}

function deletePage(pageId, websiteId) {
    websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        });
}

function findAllWebsitesForUser(userId) {
   return websiteModel
       .find({_user:userId})
       .populate('_user')
       .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    website.accessed = Date.now();
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    var pageModel = require('../page/page.model.server');

    return websiteModel
        .findByIdAndRemove(websiteId)
        .then(function (website) {
            return userModel
                .deleteWebsite(website._user, websiteId);
        })
        .then(function () {
            return pageModel
                .deletePagesForWebsite(websiteId);
        });

}
