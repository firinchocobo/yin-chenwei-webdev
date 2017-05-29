(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($location, $routeParams, pageService) {

        var model = this;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        model.updatePage = updatePage;
        model.deletePage = deletePage;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
            model.sideName = "Pages";
            model.currentName = "Edit Page";
            model.sideButtonPattern = "glyphicon glyphicon-plus";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page");
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function sideFuncButton() {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page/new");
        }

        function funcButton() {
            updatePage();
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }


    }
})();