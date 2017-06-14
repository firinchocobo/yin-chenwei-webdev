(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($location, currentUser, $routeParams, pageService) {

        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                }, function () {
                    goBack();
                });
            model.sideName = "Pages";
            model.currentName = "Edit Page";
            model.sideButtonPattern = "glyphicon glyphicon-plus";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function updatePage() {
            pageService
                .updatePage(model.pageId, model.page)
                .then(function () {
                    $location.path("/website/" + model.websiteId + "/page");
                }, function () {
                    model.error = "Can't update at this moment, try again!";
                });
        }

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + "/page");
                }, function () {
                    model.error = "Can't delete website at this moment, try again!";
                });
        }

        function goBack() {
            $location.path("/website/" + model.websiteId + "/page");
        }

        function sideFuncButton() {
            $location.url('/website/' + model.websiteId + "/page/new");
        }

        function funcButton() {
            updatePage();
            // $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();