(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($location, currentUser, $routeParams, pageService) {

        var model = this;

        model.goBack = goBack;
        model.funcButton = funcButton;

        model.userId = currentUser._id;
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
            $location.path("/website/");
        }

        function funcButton() {
            $location.path("/website/" + model.websiteId + "/page/new");
        }
    }
})();