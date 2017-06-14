(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($location, currentUser, $routeParams, websiteService) {

        var model = this;

        model.goBack = goBack;
        model.funcButton = funcButton;

        model.userId = currentUser._id;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            model.currentName = "Websites";
            model.funcButtonPattern = "glyphicon glyphicon-plus";
        }

        init();

        function goBack() {
            $location.path("/profile");
        }

        function funcButton() {
            $location.path("/website/new");
        }
    }
})();
