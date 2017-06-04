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
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
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