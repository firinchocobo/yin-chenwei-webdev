(function () {
    angular
        .module("WebAppMaker")
        .service("pageService", PageService);

    function PageService() {

        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            page.created = new Date();
            page.accessed = new Date();
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    result.push(angular.copy(pages[i]));
                }
            }
            return result;
        }

        function findPageById(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            if (page !== 'undefined') {
                return angular.copy(page);
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages[i] = page;
                    pages[i].accessed = new Date();
                }
            }
        }

        function deletePage(pageId) {
            var oldPage = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(oldPage);
            pages.splice(index, 1);
        }
    }
})();
