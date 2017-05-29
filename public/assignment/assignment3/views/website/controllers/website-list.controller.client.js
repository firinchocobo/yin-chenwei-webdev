(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($location, $routeParams, websiteService) {

        var model = this;

        model.goBack = goBack;
        model.funcButton = funcButton;

        model.userId = $routeParams.uid;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.currentName = "Websites";
            model.funcButtonPattern = "glyphicon glyphicon-plus";
        }

        init();

        function goBack() {
            $location.path("/user/" + model.userId);
        }

        function funcButton() {
            $location.path("/user/" + model.userId + "/website/new");
        }
    }
})();
