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
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.sideName = "Websites";
            model.currentName = "Edit Website";
            model.sideButtonPattern = "glyphicon glyphicon-plus";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website);
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/' + model.userId + '/website');
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website");
        }

        function sideFuncButton() {
            $location.path("/user/" + model.userId + "/website/new");
        }

        function funcButton() {
            updateWebsite();
            $location.path("/user/" + model.userId + "/website");
        }
    }
})();
