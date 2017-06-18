(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, currentUser, $routeParams, pageService) {

        var model = this;

        model.createPage = createPage;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.sideFuncButton = sideFuncButton;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.wid;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            model.page = {};
            model.sideName = "Pages";
            model.currentName = "New Page";
            model.sideButtonPattern = "glyphicon glyphicon-refresh";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function createPage() {
            if (model.page.name) {
                pageService
                    .createPage(model.websiteId, model.page)
                    .then(function () {
                        $location.path("/website/" + model.websiteId + "/page");
                    })
            } else {
                document.getElementById('name').select();
                model.error = "Page name is required";
            }
        }

        function goBack() {
            $location.path("/website/" + model.websiteId + "/page");
        }

        function sideFuncButton() {
            model.page = {};
        }

        function funcButton() {
            createPage();
            // $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

    }
})();