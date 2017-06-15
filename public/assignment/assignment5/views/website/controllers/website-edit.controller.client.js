(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, currentUser, $routeParams, websiteService) {

        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = currentUser._id;
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
                    goBack();
                });
            model.sideName = "Websites";
            model.currentName = "Edit Website";
            model.sideButtonPattern = "glyphicon glyphicon-plus";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function updateWebsite() {
            if(model.website.name) {
                websiteService
                    .updateWebsite(model.websiteId, model.website)
                    .then(function () {
                        $location.path("/website");
                    }, function () {
                        model.error = "Can't update at this moment, try again!";
                    });
            } else {
                model.error = "Website name is required";
            }
        }

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function () {
                    $location.url('/website');
                }, function () {
                    model.error = "Can't delete website at this moment, try again!";
                });
        }

        function goBack() {
            $location.path("/website");
        }

        function sideFuncButton() {
            $location.path("/website/new");
        }

        function funcButton() {
            updateWebsite();
        }
    }
})();
