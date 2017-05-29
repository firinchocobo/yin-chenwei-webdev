(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($location, $routeParams, pageService) {

        var model = this;

        model.goBack = goBack;
        model.funcButton = funcButton;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.currentName = "Pages";
            model.funcButtonPattern = "glyphicon glyphicon-plus";
        }

        init();

        function goBack() {
            $location.path("/user/" + model.userId + "/website/");
        }

        function funcButton() {
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/new");
        }
    }
})();