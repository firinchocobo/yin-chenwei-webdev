(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($location, $routeParams, websiteService) {

        var model = this;

        model.createWebsite = createWebsite;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites =  websites;
                });            model.sideName = "Websites";
            model.currentName = "New Website";
            model.sideButtonPattern = "glyphicon glyphicon-refresh";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function createWebsite() {
            websiteService
                .createWebsite(model.userId, model.website)
                .then(function () {
                    $location.path("/user/" + model.userId + "/website");
                })
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website");
        }

        function sideFuncButton() {
            model.website = {};
        }

        function funcButton() {
            createWebsite();
            // $location.path("/user/" + model.userId + "/website");
        }

    }
})();
