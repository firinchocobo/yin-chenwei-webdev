(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($location, currentUser, $routeParams, websiteService) {

        var model = this;

        model.createWebsite = createWebsite;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        // model.userId = $routeParams.uid;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.wid;


        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            model.website = {};
            model.sideName = "Websites";
            model.currentName = "New Website";
            model.sideButtonPattern = "glyphicon glyphicon-refresh";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function createWebsite() {
            if (model.website.name) {
                websiteService
                    .createWebsite(model.userId, model.website)
                    .then(function () {
                        $location.path("/website");
                    });
            } else {
                document.getElementById('name').select();
                model.error = "Website name is required";
            }
        }

        function goBack() {
            $location.path("/website");
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
