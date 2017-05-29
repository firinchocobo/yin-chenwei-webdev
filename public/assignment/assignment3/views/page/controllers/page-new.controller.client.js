(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, pageService) {

        var model = this;

        model.createPage = createPage;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.sideName = "Pages";
            model.currentName = "New Page";
            model.sideButtonPattern = "glyphicon glyphicon-refresh";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function createPage() {
            pageService.createPage(model.websiteId, model.page);
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function sideFuncButton() {
            model.page = {};
        }

        function funcButton() {
            createPage();
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

    }
})();