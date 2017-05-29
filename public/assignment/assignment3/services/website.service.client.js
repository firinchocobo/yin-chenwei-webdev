(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService", WebsiteService);

    function WebsiteService() {

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            website.created = new Date();
            website.accessed = new Date();
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    result.push(angular.copy(websites[i]));
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });
            if (website !== 'undefined') {
                return angular.copy(website);
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    websites[i].accessed = new Date();
                }
            }
        }

        function deleteWebsite(websiteId) {
            var oldWebsite = websites.find(function (website) {
                return website._id === websiteId;
            });
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1);
        }
    }
})();
