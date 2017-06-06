(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, $routeParams, websiteService) {

        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                }, function () {
                    model.error = "Can't find the requested website at this moment, try again!";
                });
            model.sideName = "Websites";
            model.currentName = "Edit Website";
            model.sideButtonPattern = "glyphicon glyphicon-plus";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function updateWebsite() {
            websiteService
                .updateWebsite(model.websiteId, model.website)
                .then(function () {
                    $location.path("/user/" + model.userId + "/website");
                }, function () {
                    model.error = "Can't update at this moment, try again!";
                });
        }

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                }, function () {
                    model.error = "Can't delete website at this moment, try again!";
                });
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website");
        }

        function sideFuncButton() {
            $location.path("/user/" + model.userId + "/website/new");
        }

        function funcButton() {
            updateWebsite();
        }
    }
})();
